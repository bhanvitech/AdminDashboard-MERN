import "./chart.scss";
import {AreaChart,Area,XAxis,CartesianGrid,Tooltip,ResponsiveContainer,} from "recharts";
import { useEffect, useState } from "react";
import axios from 'axios';

//contains static data of our graph
const cdata = [{ name: "January", Total: 1200 },
{ name: "February", Total: 2100 },
{ name: "March", Total: 800 },
{ name: "April", Total: 1600 },
{ name: "May", Total: 900 },
{ name: "June", Total: 1700 },
];

//returns charts container
const _chartdata={total:0,failed:0,success:0,rem:0,totalBatch:0};
const Chart = ({ activeIndex,aspect, title }) =>
 {
    const [chartdata,setChartData]=useState(_chartdata);
    useEffect(()=>{
     const getChartData=async()=>{
         try{
            if (activeIndex === 1) 
            {
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
                    setChartData(data.data);
                  }else{
                    console.error("Data fetch not successful");
                  }
                  console.log("data od:",data.total);
            }else{
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
                    setChartData(data.data);
                  }else{
                    console.error("Data fetch not successful");
                  }
            }
         }catch(err){
                console.log(err);
         }
     };
      getChartData();
    },[activeIndex]);
     return (
    <div className="chart">
        {/* Holding our graph title */}
        <div className="title">
            {title}
        </div>
        {/* holding our graph  */}
        <ResponsiveContainer width="100%" aspect={aspect}>
            <AreaChart width={730} height={250} 
            data={cdata} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4166f5" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#4166f5" stopOpacity={0} />
                        </linearGradient>
                        
                </defs>
                <XAxis dataKey="name" stroke="gray" />
                <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                <Tooltip />
                <Area type="monotone"dataKey="Total"stroke="#8884d8"fillOpacity={1}fill="url(#total)"/>
                </AreaChart></ResponsiveContainer></div>);};
                
export default Chart;
