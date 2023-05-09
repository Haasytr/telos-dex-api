const mongoose = require('mongoose')

const { MONGODB_URL } = require('../config/env')

const conn = mongoose.connect(MONGODB_URL)

mongoose.connection.on('connected', () => {
  console.log("Database connected!")
})

mongoose.connection.on('error', (err) => {
  console.log("Failed to connect to the database", err)
})

module.exports = {
  conn
}