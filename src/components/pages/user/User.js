import React from 'react'
import { UserlistContextProvider } from '../../../context/userlistContext/UserlistContext'
import Sidebar from '../../Sidebar'
import Navbar from '../nav/Navbar'
import './user.scss'
import UserDataWidget from './userwidgets/UserDataWidget'

import Widgetsm from './userwidgets/Widgetsm'
export default function User() {
  return (
    <UserlistContextProvider>
    <div className='users'>
        <Sidebar/>
        <div className="usercontainer">
        <Navbar heading='users'/>
        <div className='userwidgets'>
          <UserDataWidget/>
          {/* <Widgetsm/> */}
           </div>
        </div>
        
    </div>
    </UserlistContextProvider>
  )
}
