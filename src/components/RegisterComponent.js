import React, { useRef } from "react";
import './Register.scss'
import axios from 'axios'
import { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import profile from '../assets/FUZE ALM (1).jpg'
import { toast } from 'react-toastify'

const RegisterComponent = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('')
  const[error,setError]=useState('')
  

  let navigate=useNavigate()

  const emailRef=useRef();
  const passwordRef=useRef();
  

 
  const handleFinish=async(e) =>{
    e.preventDefault();
    setEmail(emailRef.current.value);
    setPassword(passwordRef.current.value);
    try{
      await axios.post("http://localhost:3000/server/auth/register",{email,password});
      navigate("/");
      toast.success(" Registered Successfully")
    }catch(err){}
  }


  
  
  return (
    
  
    <div  className="container">
      <div className="loginContainer">
      <div className="logo">

      
         <img src={profile} alt='profile' style={{height:'200px',width:'200px'}}/>
         </div>
         
         {/* <h3 className="logindash">Member Login</h3> */}
         
        <div className="emailcontainer">
        <label className="emaillabel">Email</label>
        <input id="username" className="inputemail" type='text' placeholder="Email address" ref={emailRef} onChange={e=>setEmail(e.target.value)}>

        </input>
        </div>
        <div className="passwordcontainer">
        <label className="passwordlabel">Password</label>
        <input id="password"  className="inputpassword" type='password' placeholder="Password" ref={passwordRef} onChange={e=>setPassword(e.target.value)}/>
        </div>
       
        <button className="button" onClick={handleFinish}>Register</button>
        
        <span className="register">
          Already a User ? <Link to='/'>Login</Link>
        </span>

      </div>
    </div>
  );
};

export default RegisterComponent;