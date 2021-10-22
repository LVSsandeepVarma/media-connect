import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'
import './login.css'


function Create(){
    const {id}=useParams()
    const [name,setName]=useState('')
    const [location,setLocation]=useState('')
    const [img,setImg]=useState('')
    var history=useHistory()


    const handleNameChange=(e)=>{
        setName(e.target.value)
    }
    const handleLocationChange=(e)=>{
        setLocation(e.target.value)
    }
    const handleImgChange=(e)=>{
        setImg(e.target.value)
    }

    const submit=(event)=>{
        event.preventDefault()
        const payload={
            PostName:name,
            location:location,
            img:img,
            userid:id
        }


        axios({
            url:'http://localhost:9000/createpost',
            method:"POST",
            data:payload,
            // headers:{'Access-Control-Allow-Origin': '*'  }
        })
        .then((res)=>{
            history.push(`/posts/${id}`)
        })
        .catch(()=>{console.log('internal error')})


    }
        return(
            <div className="body">
                <h1>InstaClone</h1>
                <h2>Creat new Post</h2>.
                <div className="form">
                <form  onSubmit={submit} >
                    <div>
                        <label>Post name :</label>
                        <input className="input" type="text" name="postName"  onChange={handleNameChange} placeholder="post info"  />
                    </div>
                    <div>
                        <label>location :</label>
                        <input className="input" type="text" name="location" onChange={handleLocationChange} placeholder="location"  />
                    </div>
                    <div>
                        <label>img  :</label>
                        <input className="input" type="text" name="url" onChange={handleImgChange} placeholder="imgurl"/>
                    </div>
                   
                    <div>
                        <button className="btm btn-success" type="submit" >create post</button>
                        
                    </div>
                </form>
                </div>
            </div> 
        )
    }
    


export default Create