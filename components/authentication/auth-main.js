const express = require('express');
const db = require('./db');
const mongoose = require('mongoose');
let proxy = require('express-http-proxy');


const app = express()
let path =require('path')
app.use(express.static)
app.use('/', proxy('http://localhost:5000'));
app.use(express.json({extended: true}));
var routes = require('./routes/auth.rotes');
app.use('/api/auth', routes);




const PORT = 5000

async function start() {
  try {
   
    
    await mongoose.connect( process.env.mongoUri || db.DB, {
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

module.exports=start