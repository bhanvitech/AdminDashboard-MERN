import React ,{useEffect, useState}from 'react'

import './batchdata.scss'
import axios from 'axios';
import {Chart as ChartJs,Tooltip,Title,ArcElement,Legend } from 'chart.js';
import {Pie} from 'react-chartjs-2'

ChartJs.register(
    Tooltip,Title,ArcElement,Legend
);
/**
 * 
 * @returns Dropdown list of Batches.json data
 *
 */
 const _widgetdata={total:0,failed:0,success:0,rem:0,totalBatch:0,data:[]};
export default function BatchData({id,activeIndex=1,statsdata={},isPie=true,setId=false}) {
console.log("🚀 ~ file: BatchData.js ~ line 13 ~ BatchData ~ statsdata", statsdata)
// console.log("🚀 ~ file: BatchData.js ~ line 11 ~ BatchData ~ activeIndex", activeIndex)
const [batchdata,setBatchData]=useState(_widgetdata);
  const[selectedvalue,setSelectvalue]=useState("")
  // console.log("🚀 ~ file: BatchData.js ~ line 16 ~ BatchData ~ selectedvalue", selectedvalue)
  const data = {
    labels: [
      'Error',
      'Success',
      'Remaining'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [25, 50, 25],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(100, 194, 166)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  const [piedata,setPieData]=useState(data);

  const pdata = {
    labels: [
      'Error',
      'Success',
      'Remaining'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [batchdata.failed, batchdata.success, batchdata.total-(batchdata.success+batchdata.failed)],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(100, 194, 166)',
        'rgb(255, 205, 86)'
      ],
      hoverOffset: 4
    }]
  };
  const handleChange=e=>{
    if(!setId){
setSelectvalue(e.target.value);
    }else{
      setId(e.target.value);
    }
   // 
  
  
    setPieData(pdata);
  //   console.log("🚀 ~ file: BatchData.js ~ line 20 ~ BatchData ~ obj", e.target.value)
  }

  
  useEffect(()=>{
    const getBatchdata= async()=>{
      try{
        let typeName ="";
        if (activeIndex === 1) {
          typeName="Migration"
         
        }
        else if(activeIndex===0){
          typeName="LinkCr"
        }
        const { data } = await axios.get("http://localhost:3000/server/migration/", {
          params: {
            type: typeName,id:selectedvalue
          },
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGViZjY0Zjg1YmFiN2I2NzNhMDU5NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTY3MDY3MCwiZXhwIjoxNjUyMjYyNjcwfQ.mJAafT1DU_83zHecSlXRzPQo6ursE8ZZ6SFRnlDko5s",
          },
        });
        if(data && data.success){
          setBatchData(data.data);
         // console.log(data.data);
        }else{
          console.error("Data fetch not successful");
        }
       
      }catch{}
    }
    getBatchdata();
  },[selectedvalue,activeIndex]);
 // console.log(batchdata.data.map((item)=>item.name));
 const responsedata=statsdata && statsdata.data && statsdata.data.length ? statsdata.data : batchdata.data;
console.log(statsdata.failed)
  return (
    
    <>
   
      <div className='batchdata'>
      <select value={selectedvalue || id} onChange={handleChange}>
      <option >--Select Batches--</option>
      {
        // statsdata && statsdata.data.length && statsdata.data.map((result)=>(<option  key={result._id} value={result._id} title={"Batch id :"+result._id}>{result.name}</option>))
        responsedata.map((result)=>(<option  key={result._id} value={result._id} title={"Batch id :"+result._id}>{result.name}</option>))
        
      }
      {/* <option  value={selectedvalue} onChange={handleChange}></option> */}
      </select>
    
      </div> 
      {isPie  &&
    
      <div className='piedata'>
    <Pie className='pie' selectedvalue={selectedvalue} data={piedata}/>
    </div>
    }
    </>
   
  )

}
