import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Post from './postslist'
import cors from 'cors'
import { useParams } from 'react-router'
import './posts.css'
import cam from './images/cam.png'
import logo from './images/logo.png'

// cors({
    
//     exposedHeaders:{'Access-Control-Allow-Origin':'*'} 
//   })

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
            <div style={{"background":"white"}}>
                <nav className="header_navigation" style={{"marginBottom":"8px"}}>
                <header className="mainheader" >
                    <a href={`/create/${id}`}><img src={cam} alt="img not found" style={{"fontSize":"45px","color":"black","float":"right","width":"max-content" }}/></a>
                    <h1  style={{"color":"#006238"}} > <img src={logo} style={{"color":"#006238"}}/>InstaClone </h1>
                    <hr style={{"width":"100%","margin-bottom":"25px","position":"fixed"}}></hr>
                </header>
                </nav>
            <div className="Body">
                <div className="postsform">
                <form action={`/create/${id}`} >
                    {Object.values(post).reverse().map((value)=>{
                        return(
                            <div className="content" style={{"margin-left":"auto","margin-right":"auto","width":"40%","margin-top":"5%"}} >        
                            <Post  id={value._id}
                                    username={value.username}
                                    userId={id}
                                    PostName={value.PostName}
                                    location={value.location} 
                                    img={value.img} 
                                    likes={value.likes}
                                    comments={value.comments}
                                    // date={value.date}
                            />
                            
                            </div>

                            
                        )
                    })}
                </form>
                </div>
            </div>
            </div>
        )
    
}



export default Posts