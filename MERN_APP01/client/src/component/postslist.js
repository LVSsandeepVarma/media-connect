import React, { useState } from "react"
import axios from 'axios'
import { useHistory } from "react-router"
// import './posts.css'

function Posts(props){
    console.log(props.comments[0])
    const history=useHistory()
    const [likes,setLikes]=useState(props.likes)
    const [active,setActive]=useState(true)
    const [comment,setComment]=useState('')
    const [color,setColor]=useState('black')
    
    const handleComment=(e)=>{
        setComment(e.target.value)
    }

    const handleSubmit=(e)=>
    {
        axios.patch('http://localhost:9000/comments/'+props.id,
        {
            name:props.userId,
            comment:comment
        })
    }


    const handleClick=(e)=>{
            if (active){
                axios.patch('http://localhost:9000/likes/'+props.id,
                    {
                        'likes':likes+1
                    }
                )
                setActive(false)
                setColor('red')
                setLikes(likes+1)
            }
            else{
                axios.patch('http://localhost:9000/likes/'+props.id,
                {
                    'likes':likes-1
                })
                setActive(true)
                setColor('black')
                setLikes(likes-1)
            }

    }
    const handleDelete=(e)=>{
        const payload={
            id:props.id,
            userid:props.userId
        }
        axios({
            url:"http://localhost:9000/verify/delete",
            method:"POST",
            data:payload
        })
        .then((res)=>{
            console.log(res,'history')
            history.push(`/login`)
        })
        .catch((res)=>{
            alert('not authorized')
        })
    } 
    
    const submit=(e)=>{
        const payload={
            id:props.id,
            userid:props.userId
        }
        axios({
            url:"http://localhost:9000/verify",
            method:"POST",
            data:payload
        })
        .then((res)=>{
            console.log(res,'history')
            history.push(`/posts/update/${props.userId}/${props.id}`)
        })
        .catch((res)=>{
            alert('not authorized')
        })
    }
    return(
    <div>
        <form >
            <div>
                <b><h2 style={{'color':'yellow'}} >{props.username}</h2></b>
            </div>
            
            <div>
               <h4 style={{'color':"lightyellow"}}>{props.location}</h4>
            </div>
            <div>
                <img src={props.img}  style={{"width":"30vw","height":"auto" }} alt="img not found"/>
            </div>
            
            <div>
            <i className="fa fa-heart" style={{"font-size":"36px;","color":`${color}`}}   onClick={handleClick}></i>
            <small>{likes}likes</small> 
            {/* <i className="fa fa-paper-plane" style={{"font-size":"15px"}}></i>                */}
            </div>
            <div>
                <h4>{props.PostName}</h4>
            </div>
            <label>Comments:</label>
            <div>
                    {Object.values(props.comments).map((val)=>{
                        return(
                            <div>
                                <p stylle={{"color":"khaki"}} ><b style={{"color":"black"}}>{val.name}</b> : {val.comment}</p>
                            </div>
                        )
                    })}
            
            </div>
            {/* <form> */}
                <div>
                <input type="text" placeholder="comment........" name="comment"  onChange={handleComment} class="btn btn-outline-dark Input" ></input>
                <button  type="submit" onClick={handleSubmit} className="btn btn-outline-dark Post"> Post</button>
                </div>
            {/* </form> */}
            <div>
                <button className="btn btn-outline-dark  fa fa-edit update " type="button" onClick={submit}>Update</button>
                <button className="btn btn-outline-dark fa fa-trash  delete " type="button" onClick={handleDelete}>Delete</button>
            </div>
        </form> 
        
    </div>
    )
}

export default Posts


// action={`/posts/update/${props.userId}/${props.id}`}