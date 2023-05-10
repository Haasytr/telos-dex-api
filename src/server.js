const express = require('express')

const rootRoutes = require('./routes/index')

require('./database/mongodb')
const { PORT } = require('./config/env')

const app = express()

app.use(express.json())

app.use(rootRoutes)

app.listen(PORT, () => {
  console.log(`API RUNNING ON 3333`)
})

