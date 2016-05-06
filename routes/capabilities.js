const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Capabilities = mongoose.model('Capabilities')

/* PRELOAD OBJECTS */

/* :skill param */
router.param('capabilities', function (req, res, next, id) {
  const query = Capabilities.findById(id)

  query.exec(function (err, capabilities) {
    if (err) { return next(err) }
    if (!capabilities) { return next(new Error('can\'t find capabilities')) }

    req.skill = capabilities
    
    return next()
  })
})

/* END PRELOADING OBJECTS */

/* GET /capabilities */
router.get('/', function (req, res, next) {
  Capabilities.find().populate({
    path: 'capabilities'
  }).exec(function (err, capabilities) {
    if (err) { return next(err) }

    res.json(capabilities)
  })
})

/* POST /capabilities */
router.post('/', function (req, res, next) {
  const capabilities = new Capabilities(req.body)

  capabilities.save(function (err, capabilities) {
    if (err) { return next(err) }
    res.json(capabilities)
  })
})

/* GET /capabilities/:capability */
router.get('/:capability', function (req, res, next) {
  req.capabilities.populate({
    path: 'capabilities'
  }, function (err, capabilities) {
    if (err) { return next(err) }
    
    res.json(capabilities)
  })
})

/* PUT /capabilities/:capability */
router.put('/:skill', function (req, res, next) {
  Capabilities.findOneAndUpdate({'_id': req.capabilities._id}, req.body, {new: true}, function (err, capabilities) {
    if (err) { return next(err) }

    capabilities.populate({
      path: 'capabilities'
    }, function (err, capabilities) {
      if (err) { return next(err) }
      
      res.json(capabilities)
    })
  })
})

/* DELETE /capabilities/:capability */
router.delete('/:capability', function (req, res, next) {
  Capabilities.find({'_id': req.capabilities._id}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})