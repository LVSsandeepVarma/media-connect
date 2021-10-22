import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './postslist'
import cors from 'cors'
import { useParams } from 'react-router'
import './posts.css'

cors({
    
    exposedHeaders:{'Access-Control-Allow-Origin':'*'} 
  })

  function Posts(){
    const [post,setPost]=useState([])
    const {id}=useParams()
    useEffect(()=>{
        console.log("component did mount")
        axios({
            url:'http://localhost:9000/postslist/'+id,
            method:"GET",
            
        })
        .then(res=>{
            setTimeout(() => {
                setPost(Object.values(res.data))
                console.log('timeout',post)
            }, 100);
        })
        .catch(err=>{console.log(err)})
    
    },[])
        return(
            <div className="body">
                <h1 className="h1" > <i className="fa fa-handshake-o"></i>InstaClone </h1>
                <div className="postsform">
                <form action={`/create/${id}`} >
                <button className="btn btn-success fa fa-plus-square add"  type="submit">Add</button>
                    
                    
                    {Object.values(post).reverse().map((value)=>{
                        return(
                            <div className="content">        
                            <Post  id={value._id}
                                    username={value.username}
                                    userId={id}
                                    PostName={value.PostName}
                                    location={value.location} 
                                    img={value.img} 
                                    likes={value.likes}
                                    comments={value.comments}
                            />
                            </div>

                            
                        )
                    })}
                </form>
                </div>
            </div>
        )
    
}



export default Posts