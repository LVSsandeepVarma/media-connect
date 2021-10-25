const mongoose =require("mongoose")
var PostsSchema=new mongoose.Schema({
    PostName :{type:String, required:true},
    location :{type:String, required:true},
    img:{type:String, required:true},
    likes:{type:Number ,default:0},
    userId:{type:String},
    username:{type:String},
    comments:[{name:{type:String}, comment:{type:String} }],
    // date:{type:String, default:new Date()}
})
const Postsdb=mongoose.model('postsdb',PostsSchema)
module.exports=Postsdb
