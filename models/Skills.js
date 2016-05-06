const mongoose = require('mongoose')

const SkillsSchema = new mongoose.Schema({
  title: String
})

mongoose.model('Skills', SkillsSchema)