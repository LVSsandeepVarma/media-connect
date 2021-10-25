import React,{useState} from 'react'
import axios from 'axios'
import {useHistory} from 'react-router'
import './register.css'
import image from '../component/images/landing.png'


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
        <div className="row">
            <div className="col-md-5">
                <img src={image} className="image" alt="img not found" />
            </div>
            <div className="col-md-5  ">
                    <form className="forms" onSubmit={handleSubmit}>
                        <div class="form-outline mb-4">
                            <label className="form-label" for="form1">Username</label>
                            <input type="text" id="form1" className="form-control"  onChange={changeName}/>

                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="feild2">Email address</label>



                            <input type="email" id="feild2" className="form-control" onChange={changeEmail}/>
                            
                        </div>
                        <div className="form-outline mb-4">
                            <label className="form-label" for="feild3">Password</label>
                            <input type="password" id="feild3" className="form-control" onChange={changePassword}/>
                            
                        </div>
                        <div>
                            <button className="btn btn-primary btn-block" style={{"width":"100%","marginBottom":"5px"}} type="submit">Register</button>
                        </div>
                        <div>
                            <small>Already a user?</small>
                            <input className="btn btn-primary btn-block  button" type="button" value="Login" onClick={handleLogin} />
                        </div>
                    </form>
                </div>
            </div>
    )
}
export default Register