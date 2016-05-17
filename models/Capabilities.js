const mongoose = require('mongoose')

const CapabilitiessSchema = new mongoose.Schema({
  description: String,
  title: String
})

mongoose.model('Capabilities', CapabilitiessSchema)