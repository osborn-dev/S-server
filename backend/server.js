const path = require('path')
const express = require('express')
require('colors')
const cors = require('cors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000



// Connect to database
connectDB()

const app = express()

const allowedOrigins = [
    'https://s-client-iota.vercel.app',
    'http://localhost:3001', 
  ]
  
  
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true)
        } else {
          callback(new Error('Not allowed by CORS'))
        }
      },
      credentials: true,
    })
  )

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))


app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
