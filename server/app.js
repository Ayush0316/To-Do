const express = require('express')
const cors = require('cors')

const userRouter = require('./routers/userRouters')
const authRouter = require('./routers/authRouters')
const middleware = require('./utils/middleware')

const app = express()

app.use(cors({origin:"*"}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(middleware.requestLogger)
app.use("api/auth",authRouter)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
app.use("api/user",userRouter)
app.use(middleware.unknownEndpoint)

module.exports = app