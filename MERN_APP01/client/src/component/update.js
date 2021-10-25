import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'
import './login.css'
import cam from "./images/cam.png"
import logo from './images/logo.png'

function Update(){

        const [name,setName]=useState('')
        const [location,setLocation]=useState('')
        const [img,setimg]=useState('')
        const {id,postid}=useParams()
        console.log('user id',id)
        var history=useHistory()
    
    
        const handleNameChange=(e)=>{
            setName(e.target.value)
        }
        const handleLocationChange=(e)=>{
            setLocation(e.target.value)
        }
        const handleImgChange=(e)=>{
            setimg(e.target.files[0])
        }
    
        const submit=(event)=>{
            event.preventDefault()
            const data=new FormData()
            data.append("image",img)
            data.append("id",id)
            data.append("postid",postid)
            data.append("postName",name)
            data.append("location",location)
            

            
        
            axios({
                url:'http://localhost:9000/update',
                method:"POST",
                data:data,
                // headers:{'Access-Control-Allow-Origin': '*'  }
            })
            .then((res)=>{
                
                history.push('/login')
            })
            .catch(()=>{alert('not authorized')})
    
    
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
                            <label className="form-label">Post name :</label>
                            <input className="form-control" type="text" name="postName"  onChange={handleNameChange} placeholder="post info"  />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">Post location :</label>
                            <input className="form-control" type="text" name="postLocation" onChange={handleLocationChange} placeholder="post location"  />
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label">choose file:</label>
                            <input className="form-control" type="file" name="file" onChange={handleImgChange} placeholder="imgfile"/>
                        </div>
                        <div className="button">
                            <button className="btn btn-success"  type="submit" >Update post</button>
                            
                        </div>
                    </form>
                    </div>
                </div>
                </div> 
            )
        }
        
    
    
  


export default Update