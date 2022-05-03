import React, { useContext, useState } from 'react'
import LoginComponent from './components/LoginComponent'
import {BrowserRouter as Router , Routes, Route,Navigate} from "react-router-dom";
import Query from './components/pages/Query/Query'
import Main from './components/Main'
import RegisterComponent from './components/RegisterComponent';
import { AuthContext } from './context/authContext/AuthContext';
import User from './components/pages/user/User';
import EditUser from './components/pages/user/userwidgets/EditUser';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
/**
 * 
 * @returns router
 * "/" redirects to login page
 * "home" redirects to Main Dashboard
 * "Query" redirects to Query Page
 */

export default function App() {

 const {user}=useContext(AuthContext);
  return (
    <div>
      <Router>
      <Routes>
      <Route exact path="/" element={user ? (<Navigate replace to="/home"  />):(<LoginComponent/>) } />
        <Route exact path="/home" element={user ? (<Main/>):(<Navigate replace to="/"/>) } />
        <Route exact path="register" element={!user ? (<RegisterComponent />): (<Navigate replace to="home" />)}/>
        <Route exact path="/users" element={user ? (<User/>):(<Navigate replace to="/"/>)}/>
       {user && (
       <>
        <Route path="/home" element={<Main/>} />
        <Route path="/query" element={<Query/>}/>
        <Route path='/users' element={<User/>}/>
        <Route path='/user/:id' element={<EditUser/>}/>
        </>
       )}
      </Routes>
      <ToastContainer autoClose={3000}  />
      </Router>
      
    
    </div>
  )
}
