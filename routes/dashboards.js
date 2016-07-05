const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const config = require('../config')

const Employees = mongoose.model('Employees')
const Organizations = mongoose.model('Organizations')
const Strategies = mongoose.model('Strategies')

module.exports = router

/* POST /dashboards */
/*
  req.body =
  employees:[],
  organizations: [],
  visibility: ''
*/
router.post('/', function (req, res, next) {
  let visibility = config.visibility
  
  if (req.body.visibility && config.visibility.indexOf(req.body.visibility) > -1) {
    visibility = config.visibility.slice(config.visibility.indexOf(req.body.visibility))
  }
  
  const promiseEmployees = new Promise((resolve, reject) => {
    if (req.body.employees) {
      Employees.find({'_id': {$in : req.body.employees}, 'visibility': {$in: visibility}})
      .exec(function (err, data) {
        if (err) {
          console.error('error', err)
        }

        // GET ALL SKILLS FOR EACH EMPLOYEE AND RETURN AGGREGATE LIST
        const skills = []
        
        data.forEach((employee) => {
          if(employee.skills && employee.skills.length){
            employee.skills.forEach(function(skill) {
              skills.push(skill)
            })
          }
        })
      
        resolve(skills)
      })
    } else {
      resolve([])
    }
  })

  const promiseOrganizations = new Promise((resolve, reject) => {
    if (req.body.organizations) {
      Organizations.find({'_id': {$in : req.body.organizations}})
      .populate('employees', null, {'visibility': {$in: visibility}})
      .exec(function (err, data) {
        if (err) {
          console.error('error', err)
        }

        const skills = []
        
        data.forEach((organization) => {
          // GET ALL SKILLS FOR EACH EMPLOYEE AND RETURN AGGREGATE LIST
          if(organization.employees && organization.employees.length){
            organization.employees.forEach((employee) => {
              if(employee.skills && employee.skills.length){
                employee.skills.forEach(function(skill) {
                  skills.push(skill)
                })
              }
            })
          } else {
            resolve([])
          }
        })
        
        resolve(skills)
      })
    } else {
      resolve([])
    }
  })

  Promise.all([
    promiseEmployees,
    promiseOrganizations
  ])
  .then(
    (values) => {
      let skills = {}
      
      values.forEach((value) => {
        if(value && value.length){
          value.forEach(function(skill){
            skills[skill] = ''
          })
        }
      })

      skills = {
        skills: Object.keys(skills)
      }
      
      res.json(skills)
    },
    (reason) => {
      console.error('error', reason)
    }
  )
  .catch((err) => {
    console.error('error', err)
  })
})

/* POST /dashboards/strategies */
// INPUT: ARRAY OF STRATEGY IDS
// OUTPUT: ARRAY OF SKILL IDS
router.post('/strategies', function (req, res, next) {
  if (req.body.strategies) {
    Strategies.find({'_id': {$in : req.body.strategies}})
    .exec(function (err, data) {
      if (err) {
        console.error('error', err)
      }
      
      // GET ALL SKILLS FOR EACH STRATEGY AND RETURN AGGREGATE LIST
      let skills = {}
  
      data.forEach((strategy) => {
        if(strategy.skills && strategy.skills.length){
          strategy.skills.forEach(function(skill) {
            skills[skill] = skill
          })
        }
      })

      skills = {
        skills: Object.keys(skills)
      }

      res.json(skills)
    })
  }
})