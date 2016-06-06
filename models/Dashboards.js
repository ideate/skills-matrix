const mongoose = require('mongoose')

const DashboardsSchema = new mongoose.Schema({
  skills: [{type: mongoose.Schema.Types.ObjectId, ref: 'Skills'}]
})

mongoose.model('Dashboards', DashboardsSchema)