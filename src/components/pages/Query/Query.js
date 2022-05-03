import React,{useEffect, useState} from 'react'
import Sidebar from '../../Sidebar'
import Navbar from '../nav/Navbar'
import './Query.scss'
import Batches from '../../../BatchData'
import axios from 'axios';
import Table from '../home/Tabs/table/Table'
const _widgetdata={total:0,failed:0,success:0,rem:0,totalBatch:0};
const Query = () => {
  const [widgetdata,setWidgetdata]=useState(_widgetdata);
  const[id,setId]=useState('');
 
  console.log("widget data: ",widgetdata);
  const [show,setShow]=useState(false);

  const [state,setState]=useState({
    type:"",
  
    opt:"",
   
   
  })

 // console.log("🚀 ~ file: Query.js ~ line 41 ~ getwidgetdata ~ state", state)
  
  const getwidgetdata= async()=>{
    try {

        // TODO: Get migration data
        const { data } = await axios.get("http://localhost:3000/server/migration/query", {
          params: {...state,id},
          headers: {
            token:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGViZjY0Zjg1YmFiN2I2NzNhMDU5NCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY0OTY3MDY3MCwiZXhwIjoxNjUyMjYyNjcwfQ.mJAafT1DU_83zHecSlXRzPQo6ursE8ZZ6SFRnlDko5s",
          },
        });
        if(data && data.success){
          setWidgetdata(data.data);
        }else{
          console.error("Data fetch not successful");
        }
        //setWidgetdata(data.data);
      
    } catch (err) {
      console.error(err);
    }
  };
  // useEffect(()=>{
  
  //   getwidgetdata();
  // },[]);
  return (
    <div className='query'>
        <Sidebar/>
        <div className="querycontainer">
          <Navbar heading='query'/>
          <div className="top">
         
          <form>
              <div className='forminput'>
                <label>
                    Type
                    <br></br>
                  <select
                    name="type"
                    value={state.type}
                    onChange={(e)=>{setState({...state,type:e.target.value})}}
                  >
                    <option value="">All</option>
                    <option value="Migration">Migrated</option>
                    <option value="LinkCr">Links Created</option>
                  </select>
                </label>
              </div>
              <div className='forminput'>
                <label>
                    Status
                    <br></br>
                  <select
                    name="option"
                    value={state.opt}
                    onChange={(e)=>{setState({...state,opt:e.target.value})}}
                  >
                    <option value="">All</option>
                    <option value="success">Success</option>
                    <option value="error">Error</option>
                   
                  </select>
                </label>
              </div>
              <div className='forminput'>
                <label>
                    Batch
                    <br></br>
                <Batches id={id} activeIndex={state.type==="Migration" ? 1 : !state.type? 2 : 0} setId={setId} isPie={false}/>
                </label>
              </div>
              
              
              
                 
            </form>
          </div>
          
        
          <div className="bottom">
          <button className='btn1' onClick={()=>[getwidgetdata(),setShow(true)]}>Search</button>
            
          <br/>
          {show && 
             <div className="listcontainer">
            <div className="listtitle">
             
              
              <div className="listtable">
              <Table widgetdata={widgetdata} />
              </div>
            </div>
          </div>
            }
            
          </div>
        </div>
    </div>
  )
}

export default Query
