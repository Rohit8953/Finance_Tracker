import React, { useEffect, useState } from 'react';
import { Card, Grid, Typography, Box, Icon } from '@mui/material';
import { indexing } from '../Data/data';
import { useDispatch, useSelector } from 'react-redux';
import { setexpenses, setuserData } from '../Redux/userActivitySlice';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

const RecentTransiction = () => {
  const{ selectedmonth,exchangeRate,userAllmonthData,userData,refresher}=useSelector(state=>state.useractivity)
  const dispatch=useDispatch();

  // ADD EXPENSES
 useEffect(() => {
  if (userAllmonthData[indexing[selectedmonth]]){
    const total = userAllmonthData[indexing[selectedmonth]][selectedmonth].reduce((acc, transaction) => acc + transaction.expenses, 0);
    dispatch(setexpenses(total));
  }
},[selectedmonth,refresher]);

  return (
    <Box width={"100%"}>
        <Card sx={{ borderRadius: '15px', padding: '20px', width:'100%',marginBottom:'10px' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6">Recent Activities</Typography>
            <Typography variant="body2" sx={{ color: '#757575' }}>See all</Typography>
        </Box>
        {
         userData.slice().reverse().map((transaction) =>{   //REVERSE THE ARRAY TO GET RECENT ADDED TRANSACTION ON THE TOP
             return (
              <Grid container key={transaction.id} alignItems="center" sx={{ mb: 2 }}>
               <Grid item xs={2}>
                  <Box
                  sx={{
                      borderRadius: '50%',
                      bgcolor: '#F5F7FF',
                      width: 50,
                      height: 50,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                  }}
                  >
                     <ShoppingBagOutlinedIcon style={{ color: '#F5C849' }} />
                  </Box>
              </Grid>

              <Grid item xs={8}>
                  <Typography variant="body1" fontWeight="bold">
                  {transaction.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                  {/* {transaction.date} */}
                  </Typography>
              </Grid>

              <Grid item xs={2}>
                  <Typography variant="body1" align="right">
                    { 
                       ((transaction.expenses)*exchangeRate).toFixed(2)
                    }
                  </Typography>
              </Grid>
            </Grid>
          
             )})
         }
        </Card>
    </Box>
  );
};

export default RecentTransiction;
