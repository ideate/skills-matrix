const mongoose = require('mongoose')

const CapabilitiessSchema = new mongoose.Schema({
  title: String
})

mongoose.model('Capabilities', CapabilitiessSchema)