const mongoose = require('mongoose')

const CapabilitiesSchema = new mongoose.Schema({
  description: String,
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}],
  title: String
})

mongoose.model('Capabilities', CapabilitiesSchema)