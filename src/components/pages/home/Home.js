import React from 'react'
import Navbar from '../nav/Navbar'
import Sidebar from '../../Sidebar'
import './home.scss'
import Tabss from './Tabs/TabPanel'
const Home = () => {
  /**
   * Returns Main Dashboard with components
   * Sidebar, Navbar @args heading, Tabss 
   */
  return (
    <div className='home'>
     <Sidebar/>
     <div className="homecontainer">
         <Navbar heading='dashboard'/>
        <Tabss className='tabss'/>
      
     </div>
    </div>
  )
}

export default Home

