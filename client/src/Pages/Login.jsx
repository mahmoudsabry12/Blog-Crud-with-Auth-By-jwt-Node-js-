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
    <div>
    <form onSubmit={handleSubmit}>
    
    <input 
        onChange={(e)=> setEmail(e.target.value)}
    />
    <input 
        onChange={(e)=> setPassword(e.target.value)}
    />
<button>Register</button>
</form>
    </div>
  )
}

export default Login