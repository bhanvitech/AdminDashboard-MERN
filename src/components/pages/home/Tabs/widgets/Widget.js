import React, { useEffect, useState } from 'react'
import './widget.scss'
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import ErrorIcon from '@mui/icons-material/Error';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import BatchPredictionIcon from '@mui/icons-material/BatchPrediction';
import axios from 'axios';


/**
 * 
 * @param {type} param0 
 * @returns 
 */
let query;
const _widgetdata={total:0,failed:0,success:0,rem:0,totalBatch:0};
const Widgets = ({statsData, activeIndex, type}) => {
console.log("🚀 ~ file: Widgets.js ~ line 19 ~ Widgets ~ activeIndex", activeIndex)
 const [widgetdata,setWidgetdata]=useState(_widgetdata);

  useEffect(()=>{
    const getwidgetdata= async()=>{
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
            setWidgetdata(data.data);
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
            setWidgetdata(data.data);
          }else{
            console.error("Data fetch not successful");
          }
        }
      } catch (err) {
        console.error(err);
      }
    };
    getwidgetdata();
  },[activeIndex]);
 

  let datas;
  switch(type)
  {
    
    //Total Migrated Testcase widget
    case 'Total':
      datas={
        title:"Total",
        counter:widgetdata.total,
        icon:(
          <BusinessCenterIcon className='icon' style={{color:'#6495ed'}}/>
        )
      };
      break;
      //Remaining Migrated Testcase widget
      case 'Remaining':
        datas={
          title:"Remaining",
          counter:widgetdata.rem,
          icon:(
            <WorkHistoryIcon className='icon' style={{color:'orange'}}/>
          )
        };
        break;
        //Errors in Migrated Testcase widget
      case 'Errors':
          datas={
            title:"Error Found",
            counter:widgetdata.failed,
            icon:(
              <ErrorIcon className='icon' style={{color:'red'}}/>
            )
          };
          break;
          //Successful Migrated Testcase widget
          case 'Success':
            datas={
              title:"Successfull",
              counter:widgetdata.success,
              icon:(
                <DoneAllIcon className='icon'style={{color:'green'}}/>
              )
            };
            break;
            //Total Batches Done Widget
            case 'Batches':
              datas={
                title:"Batches",
                counter:widgetdata.totalBatch,
                icon:(
                  <BatchPredictionIcon className='icon' style={{color:'#ffcc33'}}/>
                )
              };
              break;

      default:
        break;
  }




  return (
    <div className='widget'>
        <div className="top">
          
          <span className="title">
           {datas.icon}
            {datas.title}
          </span>
          <span className="counter">
            {datas.counter}
          </span>
          
          </div>
       
    </div>
  )
}

export default Widgets
