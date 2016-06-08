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
  capabilities: [],
  employees:[],
  organizations: [],
  strategies: []
*/
router.post('/', function (req, res, next) {
  console.log(req.body)

  const promiseEmployees = new Promise((resolve, reject) => {
    if (req.body.employees) {
      Employees.findOne({'_id': req.body.employees})
      // .populate('skills')
      .exec(function (err, data) {
        if (err) {
          console.error('error', err)
        }
        resolve(data.skills)
      })
    } else {
      resolve([])
    }
  })

  const promiseOrganizations = new Promise((resolve, reject) => {
    if (req.body.organizations) {
      Organizations.findOne({'_id': req.body.organizations})
      // .populate({
      //   path: 'employees',
      //   populate: {
      //     path: 'skills',
      //     model: 'Skills'
      //   }
      // })
      .exec(function (err, data) {
        if (err) {
          console.error('error', err)
        }
        // GET ALL SKILLS FOR EACH EMPLOYEE AND RETURN AGGREGATE LIST
        if(data.employees && data.employees.length){
          const skills = []

          data.employees.forEach((employee) => {
            if(employee.skills && employee.skills.length){
              // console.log(value)
              employee.skills.forEach(function(skill) {
                skills.push(skill)
              })
            }
          })

          resolve(skills)
        } else {
          resolve([])
        }
      })
    } else {
      resolve([])
    }
  })

  const promiseStrategies = new Promise((resolve, reject) => {
    if (req.body.strategies) {
      Strategies.findOne({'_id': req.body.strategies})
      // .populate('skills')
      .exec(function (err, data) {
        if (err) {
          console.error('error', err)
        }
        resolve(data.skills)
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