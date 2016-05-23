const mongoose = require('mongoose')

const StrategiesSchema = new mongoose.Schema({
  description: String,
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}],
  title: String
})

mongoose.model('Strategies', StrategiesSchema)