const mongoose = require('mongoose')

const EmployeesSchema = new mongoose.Schema({
  description: String,
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}],
  title: String
})

mongoose.model('Employees', EmployeesSchema)