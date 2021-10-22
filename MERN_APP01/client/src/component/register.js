import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router'
import './register.css'


function Register(){
    const history=useHistory()
    const [name,setName]=useState('')
    const [email,setEamil]=useState('')
    const [password,setPassword]=useState('')     

    const changeName=(e)=>{
        setName(e.target.value)
    }
    const changeEmail=(e)=>{
        setEamil(e.target.value)
    }
    const changePassword=(e)=>{
        setPassword(e.target.value)
    }

    const handleLogin=(e)=>{
        history.push('/login')
    }

    const handleSubmit=(event)=>{
        event.preventDefault()
        const payload={
            name:name,
            email:email,
            password:password
        }

        axios({
            url:'http://localhost:9000/register',
            method:'POST',
            data:payload
        })
        .then((res)=>{
            history.push('/login')
        })
        .catch(()=>{alert('invalid cradentials ')})
    }
    return(
        <div className="body">
            <h1 ><i className="fa fa-handshake-o"></i>InstaClone </h1>
            <h3>connecting people... </h3>
            <div className="form">
            <form onSubmit={handleSubmit}>
                <div>
                    <label><b>Username</b></label>
                    <input className="input" type="text" onChange={changeName} placeholder="name to be displayed  " / >
                </div>
                <div>
                    <label><b>Email</b></label>
                    <input className="input" type="email" onChange={changeEmail}  placeholder="email...." />
                </div>
                <div>
                    <label><b>password</b></label>
                    <input className="input" type="password" onChange={changePassword} placeholder="********"/>
                </div>
                <div>
                    <button className="btn btn-success" type="submit">Register</button>
                    <div>
                        <small>Already a user?</small>
                        <input className="btn btn-success  button" type="button" value="Login" onClick={handleLogin} />
                    </div>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Register