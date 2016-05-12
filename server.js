const bodyParser = require('body-parser')
const path = require('path')
const spawn = require('child_process').spawn
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder(('utf8'))
const readline = require('readline')
const fs = require('fs')
const https = require('https')
const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const serveStatic = require('serve-static')
const config = require('./config')
const app = express()
const log = (msg) => (process.stdout.write(`${msg}\n`))
const mongoose = require('mongoose')

require('./models/Capabilities')
require('./models/Organizations')
// require('./models/Settings')
require('./models/Skills')
// require('./models/Users')

mongoose.connect(config.mongourl)

const authentication = require('./routes/authentication')
const capabilities = require('./routes/capabilities')
// const explore = require('./routes/explore')
// const help = require('./routes/help')
const organizations = require('./routes/organizations')
// const settings = require('./routes/settings')
const skills = require('./routes/skills')
// const users = require('./routes/users')

app.use(morgan('dev'))
app.use(errorHandler())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(serveStatic(path.join(__dirname, 'dist')))
app.use(serveStatic(path.join(__dirname, 'fonts')))
app.use(serveStatic(path.join(__dirname, 'node_modules')))

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  next()
})

app.use('/api/authenticate', authentication)
app.use('/api/capabilities', capabilities)
// app.use('/api/explore', explore)
// app.use('/api/help', help)
app.use('/api/organizations', organizations)
// app.use('/api/settings', settings)
app.use('/api/skills', skills)
// app.use('/api/users', users)

if (app.get('env') === 'development') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const webpackConfig = require('./webpack.config')
  const compiler = webpack(webpackConfig)

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath
  }))

  app.use(webpackHotMiddleware(compiler, {
    log: log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))

  // Also write to disk -_-
  const runWebpack = spawn('webpack', ['--watch', '--colors', '--progress'])
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: true
  })

  runWebpack.stdout.on('data', (data) => {
    const message = decoder.write(data)

    readline.clearLine(process.stdin, 0)
    readline.cursorTo(process.stdin, 0)
    rl.write(message)
  })
  runWebpack.stderr.on('data', (error) => {
    const message = decoder.write(error)

    readline.clearLine(process.stdin, 0)
    readline.cursorTo(process.stdin, 0)
    rl.write(`${message} `)
  })
  runWebpack.on('close', (code) => {
    rl.write(`process exited with code ${code}`)
    rl.close()
  })
}

if (config.mongoUri) {
  const session = require('express-session')
  const connectMongo = require('connect-mongo')
  const MongoStore = connectMongo(session)
  const mongoOptions = {
    url: config.mongoUri,
    pool: true
  }

  app.use(session({
    cookie: {
      maxAge: 60 * 60 * 12 * 1000
    },
    resave: false,
    saveUninitialized: true,
    secret: config.sessionSecret,
    store: new MongoStore(mongoOptions)
  }))

  const mongoClient = require('mongodb').MongoClient

  mongoClient.connect(config.mongoUri, (error, database) => {
    if (error) {
      throw new Error(error)
    }

    log('Connected to Mongo')

    app.set('db', database)

    const serverOptions = {
      key: fs.readFileSync(config.serverKey),
      cert: fs.readFileSync(config.serverCertificate),
      ca: fs.readFileSync(config.serverCertificateAuthority),
      requestCert: true,
      rejectUnauthorized: true
    }

    https.createServer(serverOptions, app).listen(config.port, () => {
      log(`server listning on port ${config.port}`)
    })
  })
} else {
  app.listen(config.port, process.env.IP, () => {
    log(`server listning on port ${config.port}`)
  })
}

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/src/html/index.html'))
})