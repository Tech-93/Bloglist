const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

const loginRouter = require('./controllers/login')



const mongoose = require('mongoose')
const middleware = require('./utils/middleware')



console.log('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() =>{console.log('connected to MongoDB')})

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.requestLogger)

app.use(middleware.tokenExtractor)


app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app

