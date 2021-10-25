const express=require('express')
const path=require('path')
const cors=require('cors')
const bodyparser=require("body-parser")
const mongoose= require('mongoose')

const indexrouter=require('./Routes/index')
const app=express()
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(express.static(`${__dirname}/public`));
mongoose.connect("mongodb://localhost/db")

app.use(cors({
    origin:'http://localhost:3000'
}))
app.use(bodyparser.json())
app.use("/",indexrouter)
app.use(express.json())
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
app.listen(9000)
module.exports=app