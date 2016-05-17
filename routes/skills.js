const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Skills = mongoose.model('Skills')

/* PRELOAD OBJECTS */

/* :skill param */
router.param('skills', function (req, res, next, id) {
  const query = Skills.findById(id)

  query.exec(function (err, skills) {
    if (err) { return next(err) }
    if (!skills) { return next(new Error('can\'t find skills')) }

    req.skill = skills
    
    return next()
  })
})

/* END PRELOADING OBJECTS */

/* GET /skills */
router.get('/', function (req, res, next) {
  Skills.find().populate({
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
  Skills.findOneAndUpdate({'_id': req.skills._id}, req.body, {new: true}, function (err, skills) {
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