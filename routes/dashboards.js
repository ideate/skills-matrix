const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const Capabilities = mongoose.model('Capabilities')
const Dashboards = mongoose.model('Dashboards')
const Employees = mongoose.model('Employees')
const Organizations = mongoose.model('Organizations')
const Skills = mongoose.model('Skills')
const Strategies = mongoose.model('Strategies')

module.exports = router

/* POST /dashboards */
/*
  req.body =
  employees:[],
  organizations: [],
  strategies: []
*/
router.post('/', function (req, res, next) {
  console.log(req.body)
  
  const promiseEmployees = new Promise((resolve, reject) => {
    if (req.body.employees) {
      Employees.find({'_id': {$in : req.body.employees}})
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
      .populate('employees')
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

  const promiseStrategies = new Promise((resolve, reject) => {
    if (req.body.strategies) {
      Strategies.find({'_id': {$in : req.body.strategies}})
      .exec(function (err, data) {
        if (err) {
          console.error('error', err)
        }
        
        // GET ALL SKILLS FOR EACH STRATEGY AND RETURN AGGREGATE LIST
        const skills = []

        data.forEach((strategy) => {
          if(strategy.skills && strategy.skills.length){
            strategy.skills.forEach(function(skill) {
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

  Promise.all([
    promiseEmployees,
    promiseOrganizations,
    promiseStrategies
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