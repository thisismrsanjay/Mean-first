const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport =require('passport');
const config = require('./config/database')

//mongoose connection
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
    console.log('connected to database'+config.database);
})
mongoose.connection.on('error',(err)=>{
    console.log('error in db'+err);
})

const cors = require('cors');
const app = express();
const users = require('./routes/users');

//cors middleware
app.use(cors());
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use(express.static(__dirname+'/public'));

app.use('/users',users); //user







app.get('/',(req,res)=>{
    res.send('jelly');
})
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirrname,'public/index.html'))
})
const port = process.env.PORT || 8080;
app.listen(port);