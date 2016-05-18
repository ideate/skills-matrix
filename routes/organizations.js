const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Organizations = mongoose.model('Organizations')

/* GET /organizations */
router.get('/', function (req, res, next) {
  Organizations.find().sort({title: 1}).populate({
    path: 'organizations'
  }).exec(function (err, data) {
    if (err) { return next(err) }

    res.json(data)
  })
})

/* POST /organizations */
router.post('/', function (req, res, next) {
  const collection = new Organizations(req.body)

  collection.save(function (err, data) {
    if (err) { return next(err) }
    res.json(data)
  })
})

/* GET /organizations/:organization */
router.get('/:organization', function (req, res, next) {
  Organizations.findOne({'_id': req.params.organization}).populate({
    path: 'organizations'
  }).exec(function (err, data) {
    if (err) { return next(err) }

    res.json(data)
  })
})

/* PUT /organizations/:organization */
router.put('/:organization', function (req, res, next) {
  Organizations.findOneAndUpdate({'_id': req.body._id}, req.body, {new: true}, function (err, data) {
    if (err) { return next(err) }

    data.populate({
      path: 'organizations'
    }, function (err, data) {
      if (err) { return next(err) }
      
      res.json(data)
    })
  })
})

/* DELETE /organizations/:organization */
router.delete('/:organization', function (req, res, next) {
  Organizations.find({'_id': req.params.organization}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})