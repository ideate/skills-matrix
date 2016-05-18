const mongoose = require('mongoose')

const EmployeesSchema = new mongoose.Schema({
  description: String,
  title: String
})

mongoose.model('Employees', EmployeesSchema)