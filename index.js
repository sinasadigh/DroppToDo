const express = require('express')

const app = express()
require("./loaders/routes")(app)
require('./loaders/db')()
require('./services/auth/auth')

const port = process.env.PORT || 3000
app.listen(port, ()=>{console.log(`listening on port ${port}...`)})

