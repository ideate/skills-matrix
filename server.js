'use strict'

const bodyParser = require('body-parser')
const path = require('path')
const spawn = require('child_process').spawn
const StringDecoder = require('string_decoder').StringDecoder
const decoder = new StringDecoder(('utf8'))
const readline = require('readline')
const fs = require('fs')
const https = require('https')
const express = require('express')
const compression = require('compression')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const errorHandler = require('errorhandler')
const serveStatic = require('serve-static')
const config = require('./config')
const app = express()
const log = (msg) => (process.stdout.write(`${msg}\n`))
const mongoose = require('mongoose')

require('./models/Capabilities')
require('./models/Dashboards')
require('./models/Employees')
require('./models/Organizations')
require('./models/Skills')
require('./models/Strategies')

mongoose.connect(config.mongoUri)

const authentication = require('./routes/authentication')
const authUtils = require('./utils/authentication')
const capabilities = require('./routes/capabilities')
const dashboards = require('./routes/dashboards')
const employees = require('./routes/employees')
const organizations = require('./routes/organizations')
const skills = require('./routes/skills')
const strategies = require('./routes/strategies')

app.use(compression())
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

app.use(function (req, res, next) {
  if(req.path === '/api/authenticate') {
    next()
  } else {
    authUtils.authenticate(req, res)
    .then((user) => next())
    .catch(error => {
      const err = new Error('Could not authenticate you: ' + error)
      
      err.status = 503
      next(err)
    })
  }
})

app.use('/api/authenticate', authentication)
app.use('/api/capabilities', capabilities)
app.use('/api/dashboards', dashboards)
app.use('/api/employees', employees)
app.use('/api/organizations', organizations)
app.use('/api/skills', skills)
app.use('/api/strategies', strategies)

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

if (config.mongoUri &&
  config.serverCertificate &&
  config.serverCertificateAuthority &&
  config.serverKey) {
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
      ca: fs.readFileSync(config.serverCertificateAuthority),
      cert: fs.readFileSync(config.serverCertificate),
      key: fs.readFileSync(config.serverKey),
      rejectUnauthorized: true,
      requestCert: true,
      secureProtocol: 'TLSv1_2_method'
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