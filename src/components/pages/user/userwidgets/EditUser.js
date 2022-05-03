
import Button from '@mui/material/Button';
import Sidebar from '../../../Sidebar';
import Navbar from '../../nav/Navbar';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import './Edituser.scss'
import { useParams ,useLocation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialState={
  email:"",
  isAdmin:"",
  password:"",
};
export default function EditUser() {
 const [state,setState]=useState(initialState);
 const {email,password,isAdmin}=state;
  

 const {id} =useParams();
// console.log({id});
 useEffect(()=>{
   if(id){
     getsingleuser(id)
   }
 },[id]);
 const getsingleuser=async(id)=>{
   const response=await axios.get(`http://localhost:3000/server/users/find/${id}`);
   if(response.status===200){
     
    // console.log(response)
     setState({...response.data});
     console.log("🚀 ~ file: EditUser.js ~ line 37 ~ getsingleuser ~ response.data", response.data)
     console.log(state.email)
     
   }
 }
 const handleInputChange=(e)=>{
   let{name,value}=e.target;
   setState({...state,[name]:value,});
 }
 const updateUser=async(data,id)=>{
   const response=await axios.put(`http://localhost:3000/server/users/${id}`,data);
   if(response.status===200){
     toast.success(response.data);
   }
 }
 const handleSubmit=(e)=>{
   e.preventDefault();
  updateUser(state,id);
 }

 //console.log(state.email)
//  const obbj=JSON.stringify({id});
//  console.log(obbj.email);
  return (
    <div className='editusers'>
    <Sidebar/>
    <div className="editusercontainer">
    <Navbar heading='profile'/>
    <div className='edituserwidgets'>
      <h2 className='usertitle'>Edit User</h2>
      <Button className='userAddButton' variant="outlined">CREATE</Button>
       </div>
       <div className="usercontainer">
         <div className="usershow">
           <div className="usershowtop">
            
               <AccountCircleRoundedIcon className='icon'/>
               <span className='profiletitle'>Account Details</span>
            
           </div>
           <div className="usershowbottom">
             <div className="usershowinfo">
             <PersonOutlineIcon className='usershowicon'/>
             <span className='userlabel'>
               Email :</span>
             <span className='usershowdata'>{state.email}</span>
            
             </div>
             <div className="usershowinfo">
             <AdminPanelSettingsRoundedIcon className='usershowicon'/>
             <span className='userlabel'>
               Admin Rights :</span>
             <span className='usershowdata'>{state.isAdmin ? "Yes" :"No"}</span>
            
             </div>
             
           </div>
         </div>
         <div className="userupdate">
           <span className='userupdatetitle'>Edit Details</span>
           <form className='userupdateform'>
             <div className="inputfields">
             <input type="text" placeholder="username" value={state.email} onChange={(e)=>e.target.value} className='inputtext'></input>
            {/* <label className='userlabel'>Password</label> */}
            <input type="text" placeholder="password" className='inputtext' onChange={handleInputChange} value={state.password} >
              
            </input>
             </div>
{/*           
           <label className='userlabel'>Email Address</label> */}
            <div className="inputfields">
              <div className="adminfield">
              <label className='userlabel' >Admin</label>
            <select className='selectadmin' onChange={handleInputChange} value={state.isAdmin ? "Yes":"No"}>
              
            <option>Yes</option>
             <option>No</option>
             
            </select>
              </div>
           
            <button className='updatebutton' onClick={handleSubmit}>Update</button>
            </div>
          
           </form>
         </div>
       </div>
    </div>
    
</div>
    
  );
}