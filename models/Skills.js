const mongoose = require('mongoose')

const SkillsSchema = new mongoose.Schema({
  description: String,
  title: String
})

mongoose.model('Skills', SkillsSchema)