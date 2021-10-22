const express=require('express')
const router=express.Router()
const Postsdb=require('../models/posts')
const Usersdb=require('../models/users')
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken')

const secret='secret'




router.patch('/likes/:id',async function(req,res){
    try{
        const id=req.params.id
        const likes=req.body
        const res=await Postsdb.findByIdAndUpdate(id,likes)
        res.send(res)
    }
    catch(err){
        res.send('err')
    }
})

router.patch('/comments/:id',async function(req,res){
    try{
        const id=req.params.id
        const nameID=req.body.name
        const user=await Usersdb.findOne({_id:nameID})
        const comment=req.body.comment
        console.log(id,user.name,comment)
        const data=await Postsdb.findOne({_id:id})
        console.log(data)
        await Postsdb.updateOne({_id:id},{$push:{"comments":{name:user.name,comment:comment}}})
        res.sendStatus(201)
    }
    catch(err){
        console.log(err)
        res.send('err')
    }
})

router.get('/postslist/:id',async function(req,res){
    const id=req.params.id
    // console.log(id)
    const data=await Postsdb.find()
    res.json(data)
})

router.post('/register',async function(req,res){
    console.log('register')
    const password=req.body.password
    console.log(password,password.length)
    if (password.length<6){
        return res.sendStatus(419)
    }
    bcrypt.hash(req.body.password,10,async function(err,hash){
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }

    await Usersdb.create({
        name:req.body.name,
        email:req.body.email,
        password:hash
    })
    
})
    res.sendStatus(201)
})

router.post('/login',async function(req,res){
    const email=req.body.email
    const password=req.body.password
    const user=await Usersdb.findOne({email:email})
    if(!user){
        return res.sendStatus(401)
    }
    bcrypt.compare(password,user.password,function(error,result){
        if(!result){
            res.sendStatus(420)
        }
        else{
            const token=jwt.sign({
                _id:user._id
            },secret)
            jwt.verify(token,secret,function(error,decoded){
                if(error){
                    return res.sendStatus(503)
                }
            })
            
            res.status(201).send(token)
        }
    })
})

router.post('/createpost',async function(req,res){
    // console.log("body: ",req.body)
    console.log(req.body.PostName)
    const name=await Usersdb.findOne({_id:req.body.userid})
    await Postsdb.create({
        PostName:req.body.PostName,
        location:req.body.location,
        img:req.body.img,

        likes:0,
        userId:req.body.userid,
        username:name.name
    })
    res.sendStatus(201)
    
})

router.get('/delete/:id',async function(req,res){
    const id=req.params.id
    await Postsdb.deleteOne({_id:id})
    res.sendStatus(201)
})

router.post('/verify/delete',async function(req,res){
    const id=req.body.id
    const userId=req.body.userid
    console.log('id',id,'userid',userId)
    const data=await Postsdb.findOne({_id:id})
    console.log(data.userId,'userid',userId)
    // console.log('userpostid',id,'userid',userId)
    if(data.userId===userId){
        console.log('matched')
        res.redirect('/delete/'+id)
    }
    else{
        res.sendStatus(401)
    }
})

router.post('/verify',async function(req,res){
    const id=req.body.id
    const userId=req.body.userid
    console.log('id',id,'userid',userId)
    const data=await Postsdb.findOne({_id:id})
    console.log(data.userId,'userid',userId)
    // console.log('userpostid',id,'userid',userId)
    if(data.userId===userId){
        console.log('matched')
        res.sendStatus(201)
    }
    else{
        res.sendStatus(401)
    }
})



router.post('/update',async function(req,res){
    console.log('server')
    const id=req.body.id
    const postid=req.body.postid
    const name=req.body.PostName
    console.log(id,name,postid)
    const data=await Postsdb.findOne({_id:postid})
    console.log(data.userId,id)
    if(id===data.userId){
        await Postsdb.updateOne({_id:postid},{
            PostName:req.body.PostName,
            location:req.body.location,
            img:req.body.img
        })
        res.sendStatus(201)    
    }
    else{
        res.sendStatus(401)
    }
})



router.post('/verify',async function(req,res){
    console.log('9000/verify')
    const id=req.body.id
    const userid=req.body.userId
    console.log(id,userid)
    res.sendStatus(201)
})


module.exports=router