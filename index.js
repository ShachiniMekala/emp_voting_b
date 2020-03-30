const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
var cors=require("cors");
var bodyParser = require("body-parser");

app.use(bodyParser.json())

app.use(cors())
app.use(
    bodyParser.urlencoded({extended:false})
    
)

var path = require("path")
app.use(express.static(path.join(__dirname,'uploads')))


//import routes
const authRoute=require('./routes/auth');
const sugRoute=require('./routes/suggestion');
const voteRoute=require('./routes/vote');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,{ useNewUrlParser: true,useUnifiedTopology: true },()=>console.log('connected successfully'));

app.use(express.json());

//route middlewere
app.use('/api/user',authRoute);
app.use('/api/sug',sugRoute);
app.use('/api/vote',voteRoute);

app.listen(3000,()=>console.log('Server Up and Running'));