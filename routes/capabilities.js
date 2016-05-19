const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Capabilities = mongoose.model('Capabilities')

/* GET /capabilities */
router.get('/', function (req, res, next) {
  Capabilities.find().sort({title: 1}).populate({
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
  Capabilities.findOne({'_id': req.params.capability})
  .populate('skills')
  .exec(function (err, data) {
    if (err) { return next(err) }
    res.json(data)
  })
})

/* PUT /capabilities/:capability */
router.put('/:capability', function (req, res, next) {
  Capabilities.findOneAndUpdate({'_id': req.body._id}, req.body, {new: true}, function (err, capabilities) {
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
  Capabilities.find({'_id': req.params.capability}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})