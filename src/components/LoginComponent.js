import React, { useContext } from "react";
import './Login.scss'

import { useState } from "react";
import {Link} from 'react-router-dom'
import profile from '../assets/FUZE ALM (1).jpg'
import { AuthContext } from "../context/authContext/AuthContext";
import { loginCall } from "../context/authContext/apiCalls";


const LoginComponent = () => {
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const {isFetching,dispatch}=useContext(AuthContext);
  const {error,message} =useContext(AuthContext);
 
 
const handlelogin=(e)=>{
  e.preventDefault();
  loginCall({email,password},dispatch);
 
  }

  
  
  return (
    
  
    <div  className="container">
       {
                    error ? <p style={{color:'white'}}>{message}</p> : null
                }
      <div className="loginContainer">
     
         <div className="logo">
         <img src={profile} alt='profile' style={{height:'200px',width:'200px'}}/>
         </div>
         
         {/* <h3 className="logindash">Member Login</h3> */}
         
        <div className="emailcontainer">
        <label className="emaillabel">Email</label>
        <input id="username" className="inputemail" type='text' placeholder="Email address"  onChange={e=>setEmail(e.target.value)}>

        </input>
        </div>
        <div className="passwordcontainer">
        <label className="passwordlabel">Password</label>
        <input id="password"  className="inputpassword" type='password' placeholder="Password"  onChange={e=>setPassword(e.target.value)}/>
      
        </div>

       
	
        <button className="button" disabled={isFetching} onClick={handlelogin}>Log In</button>
       
        <span className="register">Not a user ? <Link to='/register'>Sign Up Now</Link></span>
      </div>
     
    </div>
  );

};

export default LoginComponent;