const express = require('express')
const db = require('./db')
const mongoose = require('mongoose')

const app = express()
const path =require('path')
app.use(express.static(path.join(__dirname, 'logo.html')))

app.use(express.json({extended: true}));
var routes = require('./routes/router');
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});



const PORT = process.env.PORT || 5000

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