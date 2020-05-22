const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/database.js');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors());
mongoose.connect(process.env.MONGODB_URI || config.database, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
let db = mongoose.connection;
db.once('open', function(){
  console.log('connected to MondoDB')
});
db.on('error', function(err){
  console.log(err)
});
app.use(bodyParser.json());
//Import Routes
const postsRoute = require('./routes/posts');
app.use('/posts', postsRoute);

app.get('/', (req, res)=> {
    res.send("Thanks")
});



app.listen(3000, ()=> {
    console.log('Server started on localhost:3000')
});