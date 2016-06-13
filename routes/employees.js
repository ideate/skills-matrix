const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Employees = mongoose.model('Employees')

/* GET /employees */
router.get('/', function (req, res, next) {
  Employees.find().sort({title: 1}).populate({
    path: 'employees'
  }).exec(function (err, employees) {
    if (err) { return next(err) }

    res.json(employees)
  })
})

/* POST /employees */
router.post('/', function (req, res, next) {
  const employees = new Employees(req.body)

  employees.save(function (err, employees) {
    if (err) { return next(err) }
    res.json(employees)
  })
})

/* GET /employees/:employee */
router.get('/:employee', function (req, res, next) {
  Employees.findOne({'_id': req.params.employee})
  .populate('skills')
  .exec(function (err, data) {
    if (err) { return next(err) }
    res.json(data)
  })
})

/* PUT /employees/:employee */
router.put('/:employee', function (req, res, next) {
  Employees.findOneAndUpdate({'_id': req.body._id}, req.body, {new: true}, function (err, employees) {
    if (err) { return next(err) }

    employees.populate(
      'skills',
      function (err, employees) {
      if (err) { return next(err) }
      
      res.json(employees)
    })
  })
})

/* DELETE /employees/:employee */
router.delete('/:employee', function (req, res, next) {
  Employees.find({'_id': req.params.employee}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})