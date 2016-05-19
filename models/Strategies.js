const mongoose = require('mongoose')

const StrategiesSchema = new mongoose.Schema({
  description: String,
  title: String
})

mongoose.model('Strategies', StrategiesSchema)