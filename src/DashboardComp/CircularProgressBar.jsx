import React, { useEffect } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import {  valueFormatter } from './webUsageStats';
import { Box, Card } from '@mui/material';
import { useSelector } from 'react-redux';

  
export default function CircularProgressBar(){
  
  const [data, setData] = React.useState([]);
  const{ selectedmonth,userData,userAllmonthData,savingdata,refresher}=useSelector(state=>state.useractivity)

  let totalIncom=savingdata[selectedmonth][0];
  
  function percentage(value){
    return ((value/totalIncom)*100).toFixed(2);
  }

 useEffect(()=>{
    // SUMMETION OF ALL EXPENSES ACCORDING TO ITS CATEGORY
    if (userData.length>0){
    const categoryExpenses = userData.reduce((acc, element) => {
        if (acc[element.category]) {
          acc[element.category] += element.expenses;
        } else {
          acc[element.category] = element.expenses;
        }
        return acc;
      }, {});
      
    const updatedData = Object.entries(categoryExpenses).map(([key, value]) => ({
        label: key,  
        value:percentage(value)
      }));

      setData(updatedData);
    }
  }, [selectedmonth,userAllmonthData]);

  console.log("first,...", refresher);

  return (
    <Box  >
        <Card sx={{borderRadius:'15px', width:'100%',paddingY:'20px'}}>
          {/* CIRCULER CHART */}
            <PieChart
              series={[
                {
                data: data,
                highlightScope: { fade: 'global', highlight: 'item' },
                faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                valueFormatter,
                },
            ]}
            height={200}
            />
        </Card>
    </Box>
  );
}