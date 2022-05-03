import React, { useContext } from 'react'

import './Sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {Link} from 'react-router-dom'
import sidelogo from '../assets/sidelogo1.png'
import { AuthContext } from '../context/authContext/AuthContext';
import { logout } from '../context/authContext/AuthAction';

/**
 * 
 * @returns Home , Query & Logout component : on click
 */
const Sidebar = () => {
    const {dispatch} =useContext(AuthContext)
  return (
    <div className='sidebar'>
        <div className='top'>
            {/* Logo for our Homepage, onclick return to Homepage */}
            <Link to="/home" style={{textDecoration : "none"}}>
            <span className='dashboardlogo'>
                <img src={sidelogo} alt='sizelogo' style={{height:'50px', width:'50px'}}/>
                </span>
               
            </Link>
            <br/>
            <span style={{fontFamily:'Mulish',fontWeight:'bold',marginLeft:'10px', color: '#A4A6B3'}}> FUZE ALM</span>
        </div>
       {/* Home page title and logo */}
        <div className='mid'>
            <ul>
            <Link to="/home" style={{textDecoration : "none" ,color:'white'}}>
                <li>
                    <DashboardIcon className='iconlist'/>
                    <span className='span'>Dashboard</span>
                </li>
            </Link>
            {/* Query Page title and logo */}
            <Link to="/query" style={{textDecoration : "none",color:'white'}}>
                <li>
                    <ContentPasteSearchIcon className='iconlist'/>
                    <span className='span'>Query</span>
                </li>
            </Link>
            <Link to="/users" style={{textDecoration : "none",color:'white'}}>
                <li>
                    <PersonOutlineOutlinedIcon className='iconlist'/>
                    <span className='span'>Users</span>
                </li>
            </Link>
               {/* Login Page title and logo */}
            
                <li>
                    <ExitToAppIcon className='iconlist'/>
                    <span className='span' onClick={()=>{
                        dispatch(logout())
                        
                        }}>Logout</span>
                </li>
            
               
            </ul>
        </div>

    </div>
  )
}

export default Sidebar
