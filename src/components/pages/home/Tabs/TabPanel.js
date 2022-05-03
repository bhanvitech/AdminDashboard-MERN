import React, { useEffect, useState } from "react";
import axios from 'axios';

import Chart from "./chart/Chart";
import Featured from "./Featured/Featured";
import Widgets from "./widgets/Widgets";

import './TabPanel.scss'


/**
 * 
 * @returns  Testcase Migration Tab Component and Link Creation Tab Component
 */

export default function Tabss() {
  const [activeIndex, setActiveIndex] = useState(1);
 const [statsdata,setStatsData]=useState({});
// console.log("🚀 ~ file: TabPanel.js ~ line 19 ~ Tabss ~ statsdata", statsdata)
 useEffect(()=>{
  const getstatsdata= async()=>{
    try {
      if (activeIndex === 1) {
        // TODO: Get migration data
        const { data } = await axios.get("http://localhost:3000/server/migration/", {
          params: {
            type: "Migration"
          },
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGViZjY0Zjg1YmFiN2I2NzNhMDU5NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTY3MDY3MCwiZXhwIjoxNjUyMjYyNjcwfQ.mJAafT1DU_83zHecSlXRzPQo6ursE8ZZ6SFRnlDko5s",
          },
        });
        if(data && data.success){
          setStatsData(data.data);
        }else{
          console.error("Data fetch not successful");
        }
        //setWidgetdata(data.data);
      } else {
        // TODO: Get link data
        const { data } = await axios.get("http://localhost:3000/server/migration/", {
          params: {
            type: "LinkCr"
          },
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGViZjY0Zjg1YmFiN2I2NzNhMDU5NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTY3MDY3MCwiZXhwIjoxNjUyMjYyNjcwfQ.mJAafT1DU_83zHecSlXRzPQo6ursE8ZZ6SFRnlDko5s",
          },
        });
        if(data && data.success){
          setStatsData(data.data);
        }else{
          console.error("Data fetch not successful");
        }
      }
    } catch (err) {
      console.error(err);
    }
  };
  getstatsdata();
},[activeIndex]);

  const handleClick = async (index) => {
    setActiveIndex(index)
  }
  //console.log("🚀 ~ file: TabPanel.js ~ line 17 ~ Tabss ~ handleClick", handleClick)
  const checkActive = (index, className) => {
  //  console.log(index, className, activeIndex);
    return activeIndex === index ? className : ""
  }
  //console.log("🚀 ~ file: TabPanel.js ~ line 19 ~ Tabss ~ checkActive", checkActive())
  return (
    <div>
      <div className="tabs">
        <button
          className={`tab ${checkActive(1, "active")}`}
          onClick={() => [handleClick(1)]}
        >
          TestCase Migration
        </button>
        <button
          className={`tab ${checkActive(2, "active")}`}
          onClick={() => [handleClick(2)]}
        >
          Link Creation
        </button>

      </div>
      <div className="panels">
        {/* Testcase Migration Tab Component contains widgets, chart and graph */}
        <div className={`panel ${checkActive(1, "active")}`}>
          <div className="widgets">
            {/* Widgets :Total,Success, Remaining,Errors,Batches */}
            <Widgets  activeIndex={activeIndex} type="Total" />
            <Widgets  activeIndex={activeIndex} type='Success' />
            <Widgets  activeIndex={activeIndex} type="Remaining" />
            <Widgets  activeIndex={activeIndex} type="Errors" />
            <Widgets  activeIndex={activeIndex} type="Batches" />

          </div>

          <div className="charts">
            {/* Contains Graph :Chart Component , Piechart:Featured Component */}
            <Chart activeIndex={activeIndex}  title='Last 6 months statistics' aspect={2 / 1} />
            <Featured statsdata={statsdata} activeIndex={activeIndex} />
          </div>


        </div>
        {/* Link Creation Tab Component contains widgets, chart and graph */}
        <div className={`panel ${checkActive(2, "active")}`}>
          <div className="widgets">
            <Widgets  activeIndex={activeIndex} type="Total" />
            <Widgets  activeIndex={activeIndex} type="Success" />
            <Widgets  activeIndex={activeIndex} type="Remaining" />
            <Widgets  activeIndex={activeIndex} type="Errors" />
            <Widgets  activeIndex={activeIndex} type="Batches" />


          </div>
          <div className="charts">

            <Chart activeIndex={activeIndex} title='Last 6 months statistics' aspect={2 / 1} />
            <Featured statsdata={statsdata} activeIndex={activeIndex} />
          </div>

        </div>


      </div>
    </div>
  )
}

