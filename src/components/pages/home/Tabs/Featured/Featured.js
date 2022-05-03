import React from 'react'
import './featured.scss'
import 'react-circular-progressbar/dist/styles.css'
import BatchData from '../../../../../BatchData'


/**
 * 
 * @returns Featured component with DropDown of Batches and Piechart
 */
const Featured = ({activeIndex,statsdata}) => {
//console.log("🚀 ~ file: Featured.js ~ line 13 ~ Featured ~ statsdata", statsdata)
 
   
  return (
    <div className='featured'>
      {/* Dropdown Component */}
      <div className="top">
          <h1 className="title">
         <BatchData statsdata={statsdata} activeIndex={activeIndex}/>
          </h1>
      </div>
      {/* PieChart component */}
      {/* <div className="bottom">
          <div className="featuredchart">
          </div>
      </div> */}
    </div>
  )
}

export default Featured
