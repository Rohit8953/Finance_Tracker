import { Box, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { AreaChart, Area, CartesianGrid, Tooltip, XAxis, YAxis, defs, ResponsiveContainer } from 'recharts';

const AreaChartss = () => {

  const{ selectedmonth,userData,userAllmonthData,exchangeRate}=useSelector(state=>state.useractivity)
  const [data, setData] = useState([]); //EXPENSES MONEY 

  useEffect(() =>{
    if (userData.length>0){
      const updatedData = userData.map(items => ({
        name: items.title,
        uv: ((items.expenses)*exchangeRate).toFixed(0)
      }));
      setData(updatedData);
    }
  }, [selectedmonth,userAllmonthData,exchangeRate]);
  console.log("first",data);
  return (
    <Box marginY={'20px'}>
      <Card sx={{ padding: '10px', borderRadius: '15px', width: '100%', display: 'inline-block' }}>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis fontSize={'10px'} dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </Box>
  );
}

export default AreaChartss;
