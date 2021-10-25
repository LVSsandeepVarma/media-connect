import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'
import './login.css'
import cam from './images/cam.png'
import logo from './images/logo.png'


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
        setImg(e.target.files[0])
        console.log(e.target.files[0])
    }

    const submit=(event)=>{
        event.preventDefault()
        const data=new FormData()
        data.append("image",img)
        data.append("PostName",name)
        data.append("location",location)
        data.append("userid",id)
            // PostName:name,
            // location:location,
            // file:("file",img),
            // userid:id
        


        axios({
            url:'http://localhost:9000/createpost',
            method:"POST",
            data:data,
            // headers:{'Access-Control-Allow-Origin': '*'  }
        })
        .then((res)=>{
            history.push(`/posts/${id}`)
        })
        .catch(()=>{console.log('internal error')})


    }
        return(
            <div>
                 <header style={{"padding":"10px"}}>
                        <img src={cam} alt="img not found" style={{"fontSize":"45px","color":"black","float":"right","width":"max-content","padding":"5px"  }}/>
                        <h1  style={{"color":"#006238"}}><img src={logo} alt="img not found"/>Instaclone</h1>
                        
                        <hr></hr>
                    </header>
            <div className="row">
                <div className="col-md-5">
                <form className="updateforms"  onSubmit={submit} >
                    <div className="form-outline mb-4">
                        <label className="form-label" >Post name :</label>
                        <input className="form-control" type="text" name="postName"  onChange={handleNameChange} placeholder="post info"  />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">location :</label>
                        <input className="form-control" type="text" name="location" onChange={handleLocationChange} placeholder="location"  />
                    </div>
                    <div className="form-outline mb-4">
                        <label className="form-label">choose file:</label>
                        <input className="form-control" type="file" name="file" onChange={handleImgChange} placeholder="imgfile"/>
                    </div>
                   
                    <div className="button">
                        <button className="btn btn-success " type="submit" >create post</button>
                        
                    </div>
                </form>
                </div>
            </div> 
            </div>
        )
    }
    


export default Create