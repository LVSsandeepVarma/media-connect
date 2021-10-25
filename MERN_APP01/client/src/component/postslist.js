import React, { useState } from "react"
import axios from 'axios'
import { useHistory } from "react-router"
import './posts.css'
import heart from './images/heart.png'

function Posts(props){
    // console.log(props.comments[0])
    console.log(props.date.slice(3,15))
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
    <div >
        <form className="justify-content-md-center" style={{"border":" 1px solid", "width":"100%","height":"100%","display":"inline-block","marginTop":"70px"}} >
            <nav className="navbar-light">
            <header className="miniH" >
                <div style={{"width":"100%"}}>    
                    <b><h3>{props.username}</h3></b>
                    <p style={{"color":"#707070"}}>{props.location}</p>
                </div>
                <div>
                    <i className='fa fa-ellipsis-h'  style={{"paddingRight":"10px"}}></i>
                </div>
            </header>
            </nav>
            <div>
                <img src={"http://localhost:9000/"+props.img}  style={{"width":"100%","height":"40vh" }} alt="img not found"/>
            </div>
            <div className="miniH">
                    <i className="fa fa-heart" style={{  "fontSize":"20px","color":`${color}`}}   onClick={handleClick}/>
                    <i style={{"font-size":"20px","paddingLeft":"2.5%"}} className='fa fa-paper-plane'></i> 
                    <p style={{"paddingLeft":"370px","paddingTop":"10px"}}>{props.date.slice(3,15)}</p>
            </div>
            <small style={{"paddingLeft":"25px"}}>{likes} likes</small> 
            <footer style={{"paddingLeft":"25px"}}>
            <div>
                <h4>{props.PostName}</h4>
            </div>
            <label>Comments:</label>
            <div>
                    {Object.values(props.comments).map((val)=>{
                        return(
                            <div>
                                <p><b>{val.name}</b> : {val.comment}</p>
                            </div>
                        )
                    })}
            
            </div>
            {/* <form> */}
                <div>
                <input type="text" placeholder="comment........" name="comment"  onChange={handleComment} className="btn btn-outline-dark Input" ></input>
                <button  type="submit" onClick={handleSubmit} className="btn btn-outline-dark Post"> Post</button>
                </div>
            {/* </form> */}
            </footer>
            <div>
            
                <button className="btn btn-outline-dark  fa fa-edit update "style={{"color":"green"}}  type="button" onClick={submit}>Update</button>
                <button className="btn btn-outline-dark fa fa-trash  delete " style={{"float":"right", "color":"red"}} type="button" onClick={handleDelete}>Delete</button>
            </div>
        </form> 
        
    </div>
    )
}

export default Posts


// action={`/posts/update/${props.userId}/${props.id}`}