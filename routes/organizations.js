const express = require('express')
const router = express.Router()

module.exports = router

const mongoose = require('mongoose')
const Organizations = mongoose.model('Organizations')

/* PRELOAD OBJECTS */

/* :organizations param */
router.param('organizations', function (req, res, next, id) {
  const query = Organizations.findById(id)

  query.exec(function (err, organizations) {
    if (err) { return next(err) }
    if (!organizations) { return next(new Error('can\'t find organizations')) }

    req.organizations = organizations
    
    return next()
  })
})

/* END PRELOADING OBJECTS */

/* GET /organizations */
router.get('/', function (req, res, next) {
  Organizations.find().populate({
    path: 'organizations'
  }).exec(function (err, organizations) {
    if (err) { return next(err) }

    res.json(organizations)
  })
})

/* POST /organizations */
router.post('/', function (req, res, next) {
  const organizations = new Organizations(req.body)

  organizations.save(function (err, organizations) {
    if (err) { return next(err) }
    res.json(organizations)
  })
})

/* GET /organizations/:organization */
router.get('/:organization', function (req, res, next) {
  req.organizations.populate({
    path: 'organizations'
  }, function (err, organizations) {
    if (err) { return next(err) }
    
    res.json(organizations)
  })
})

/* PUT /organizations/:organization */
router.put('/:organization', function (req, res, next) {
  Organizations.findOneAndUpdate({'_id': req.organizations._id}, req.body, {new: true}, function (err, organizations) {
    if (err) { return next(err) }

    organizations.populate({
      path: 'organizations'
    }, function (err, organizations) {
      if (err) { return next(err) }
      
      res.json(organizations)
    })
  })
})

/* DELETE /organizations/:organization */
router.delete('/:organization', function (req, res, next) {
  Organizations.find({'_id': req.organizations._id}).remove(function (err) {
    if (err) { return next(err) }
  
    res.json({})
  })
})