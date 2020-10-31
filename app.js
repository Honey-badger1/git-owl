const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.static("public"))

app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))

const PORT = process.env.PORT|| 5000

async function start() {
  try {
    await mongoose.connect(process.env.mongoUri||'mongodb://localhost:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()

