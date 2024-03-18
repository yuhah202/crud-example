const express = require('express')
const path = require('path')
const morgan = require('morgan')
const route = require('./routes')

const app = express()
const port = 3000

// USING STATIC FILE
app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
  extended:true,
}))
app.use(express.json())

// HTTP LOGGER
// app.use(morgan('combined'))

// ROUTES INIT
route(app)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})