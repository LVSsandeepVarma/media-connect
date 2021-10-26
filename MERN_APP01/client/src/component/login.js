import axios from 'axios'
import React,{useState} from 'react'
import { useHistory } from 'react-router'
import { decodeToken } from "react-jwt";
import './register.css'

import image from '../component/images/landing.png'

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
        <div className="row">
            <div className="col-md-5">
                <img src={image} style={{"width":"75%","height":"75%"}} className="image" alt="img not found" />
            </div>
            <div className="col-md-5  ">
                    <form className="forms" onSubmit={handleSubmit}>

                        <div className="form-outline mb-4">
                            <label className="form-label" for="feild2">Email address</label>
                            <input type="email" id="feild2" className="form-control" onChange={changeEmail}/>
                            
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="feild3">Password</label>
                            <input type="password" id="feild3" className="form-control" onChange={changePassword}/>
                            
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block" style={{"width":"95%","marginBottom":"5%" ,"marginLeft":"2.5%"}} type="submit">Login</button>
                        </div>
                    </form>
                </div>
            </div>
    )
}

export default Login