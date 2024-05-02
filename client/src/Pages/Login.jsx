import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()
    const navigate = useNavigate()


    axios.defaults.withCredentials =true
    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/login',{ email ,password})
        .then(res =>{
            if(res.data.Login){
                navigate('/dashboard')
                
            }else {
                navigate('/')
            }
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  return (
    <div className='Login'>
    <form onSubmit={handleSubmit}>
    
    <input 
    type='email'
    placeholder='Enter Your Email'
        onChange={(e)=> setEmail(e.target.value)}
        required
    />
    <input 
    type='password'
    placeholder='Enter Your Password'
        onChange={(e)=> setPassword(e.target.value)}
        required
    />
<button>Login</button>
</form>
    </div>
  )
}

export default Login