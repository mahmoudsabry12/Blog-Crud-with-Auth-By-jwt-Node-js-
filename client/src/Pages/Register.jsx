import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css' 
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const [name,setName]=useState()
    const [email,setEmail]=useState()
    const [password,setPassword]=useState()

    const navigate = useNavigate()

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.post('http://localhost:3001/register',{name, email ,password})
        .then(res => navigate('/login'))
        .catch(err => console.log(err))
    }
  return (
    <div>
    <form onSubmit={handleSubmit}>
    <input 
        onChange={(e)=> setName(e.target.value)}
    />
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

export default Register