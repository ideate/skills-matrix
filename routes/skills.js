const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Skills = mongoose.model('Skills')

/* GET /skills */
router.get('/', function (req, res, next) {
  Skills.find().sort({title: 1}).populate({
    path: 'skills'
  }).exec(function (err, skills) {
    if (err) { return next(err) }

    res.json(skills)
  })
})

/* POST /skills */
router.post('/', function (req, res, next) {
  const skills = new Skills(req.body)

  skills.save(function (err, skills) {
    if (err) { return next(err) }
    res.json(skills)
  })
})

/* GET /skills/:skill */
router.get('/:skill', function (req, res, next) {
  Skills.findOne({'_id': req.params.skill}).populate({
    path: 'skills'
  }).exec(function (err, skill) {
    if (err) { return next(err) }

    res.json(skill)
  })
})

/* PUT /skills/:skill */
router.put('/:skill', function (req, res, next) {
  Skills.findOneAndUpdate({'_id': req.body._id}, req.body, {new: true}, function (err, skills) {
    if (err) { return next(err) }

    skills.populate({
      path: 'skills'
    }, function (err, skills) {
      if (err) { return next(err) }
      
      res.json(skills)
    })
  })
})

/* DELETE /skills/:skill */
router.delete('/:skill', function (req, res, next) {
  Skills.find({'_id': req.params.skill}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})