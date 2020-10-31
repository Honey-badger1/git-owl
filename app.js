const express = require('express')
const config = require('./db');
const mongoose = require('mongoose')
const dotenv = require("dotenv");

dotenv.config();

const app = express()

app.use(express.static("public"))
app.use(express.json({extended: true}))
app.use('/api/auth', require('./routes/auth.routes'))
mongoose.set("debug",true)
mongoose.Promise=global.Promise

const PORT = process.env.PORT || 5000;
const db="mongodb+srv://margo:margo12345@gitowl.a7zud.mongodb.net/auth?retryWrites=true&w=majority"
async function start() {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }).then(
      () => {console.log('Database is connected') },
      err => { console.log('Can not connect to the database'+ err)}
  );
  mongoose.connection.on('connected', ()=>{
    console.log('connected')
  })
  
    app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`))
  } catch (e) {
    console.log('Server Error', e.message)
    process.exit(1)
  }
}

start()


