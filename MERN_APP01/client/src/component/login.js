import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router'
import { decodeToken } from "react-jwt";
import './login.css'

function Login(){
    const history=useHistory()
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const changeEmail=(e)=>{
        setEmail(e.target.value)
    }
    const changePassword=(e)=>{
        setPassword(e.target.value)
    }
    const handleSubmit=(event)=>{
        event.preventDefault()
        const payload={
            email:email,
            password:password
        }
        axios({
            url:'http://localhost:9000/login',
            method:"POST",
            data:payload
        })
        .then((res)=>{
            console.log(res.data)
            const token=res.data
            const myDecodedToken = decodeToken(token);
            const id=myDecodedToken._id
            history.push(`/posts/${id}`)
        })
        .catch(()=>{
            alert('wrong credentials')
            history.push('/')})
    }

    return(
        <div className="body">
            <h1 ><i className="fa fa-handshake-o"></i>InstaClone </h1>
            <h3>connecting people... </h3>
            <div className="form">
            <form onSubmit={handleSubmit}>
                <div> 
                    <label>Email</label>
                    <input className="input" type="email" onChange={changeEmail} placeholder="@gmail.com"/>
                </div>
                <div>
                    <label>password</label>
                    <input className="input" type="password" onChange={changePassword} placeholder="*************" />
                </div>
                <div>
                    <button className="btn btn-success" type="submit">Login</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Login