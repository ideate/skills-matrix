const mongoose = require('mongoose')

const OrganizationsSchema = new mongoose.Schema({
  title: String
})

mongoose.model('Organizations', OrganizationsSchema)