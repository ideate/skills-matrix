const mongoose = require('mongoose')

const OrganizationsSchema = new mongoose.Schema({
  description: String,
  employees: [{type: mongoose.Schema.Types.ObjectId, ref: 'Employees'}],
  title: String
})

mongoose.model('Organizations', OrganizationsSchema)