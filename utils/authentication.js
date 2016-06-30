'use strict'

const Promise = require('bluebird')

exports.authenticate = authenticate

function authenticate (req, res) {
  return new Promise(function (resolve, reject) {
    resolve({username: "user", authenticated: true})
  })
}