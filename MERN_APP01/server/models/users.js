const mongoose =require("mongoose")
var ClientSchema=new mongoose.Schema({
    name :{type:String, required:true,unique:true},
    email :{type:String,required:true,unique:true},
    password:{type:String,required:true,unique:true},
})
const Usersdb=mongoose.model('usersdb',ClientSchema)
module.exports=Usersdb