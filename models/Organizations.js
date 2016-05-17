const mongoose = require('mongoose')

const OrganizationsSchema = new mongoose.Schema({
  description: String,
  title: String
})

mongoose.model('Organizations', OrganizationsSchema)