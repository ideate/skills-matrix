const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Strategies = mongoose.model('Strategies')

/* GET /strategies */
router.get('/', function (req, res, next) {
  Strategies.find().sort({title: 1}).populate({
    path: 'strategies'
  }).exec(function (err, data) {
    if (err) { return next(err) }

    res.json(data)
  })
})

/* POST /strategies */
router.post('/', function (req, res, next) {
  const collection = new Strategies(req.body)

  collection.save(function (err, data) {
    if (err) { return next(err) }
    res.json(data)
  })
})

/* GET /strategies/:strategy */
router.get('/:strategy', function (req, res, next) {
  Strategies.findOne({'_id': req.params.strategy})
  .populate('skills')
  .exec(function (err, data) {
    if (err) { return next(err) }
    res.json(data)
  })
})

/* PUT /strategies/:strategy */
router.put('/:strategy', function (req, res, next) {
  Strategies.findOneAndUpdate({'_id': req.body._id}, req.body, {new: true}, function (err, data) {
    if (err) { return next(err) }

    data.populate({
      path: 'strategies'
    }, function (err, data) {
      if (err) { return next(err) }
      
      res.json(data)
    })
  })
})

/* DELETE /strategies/:strategy */
router.delete('/:strategy', function (req, res, next) {
  Strategies.find({'_id': req.params.strategy}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})