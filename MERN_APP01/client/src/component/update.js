import React, { useState } from 'react'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { useParams } from 'react-router'

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
            setimg(e.target.value)
        }
    
        const submit=(event)=>{
            event.preventDefault()
            const payload={
                id:id,
                postid:postid,
                postName:name,
                location:location,
                img:img

            }
        
            axios({
                url:'http://localhost:9000/update',
                method:"POST",
                data:payload,
                // headers:{'Access-Control-Allow-Origin': '*'  }
            })
            .then((res)=>{
                
                history.push('/login')
            })
            .catch(()=>{alert('not authorized')})
    
    
        }
            return(
                <div className="body">
                    <h1>InstaClone</h1>
                    <h2>Update Your post Details</h2>
                    <div className="form">
                    <form  onSubmit={submit} >
                        <div>
                            <label>Post name :</label>
                            <input className="input" type="text" name="postName"  onChange={handleNameChange} placeholder="post info"  />
                        </div>
                        <div>
                            <label>Post location :</label>
                            <input className="input" type="text" name="postLocation" onChange={handleLocationChange} placeholder="post location"  />
                        </div>
                        <div>
                            <label>image url</label>
                            <input className="input" type="text" name="imgurl" onChange={handleImgChange} placeholder="url" />
                        </div>
                        <div>
                            <button  type="submit" >Update post</button>
                            
                        </div>
                    </form>
                    </div>
                </div> 
            )
        }
        
    
    
  


export default Update