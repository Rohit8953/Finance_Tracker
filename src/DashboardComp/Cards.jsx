import { Box, Button, Card, CardContent, CardMedia, FormControl, FormControlLabel, FormLabel, Grid, IconButton, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField, Toolbar, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import MoneyIcon from '@mui/icons-material/Money';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SavingsIcon from '@mui/icons-material/Savings';
import {indexing,month} from '../Data/data'
import { useDispatch, useSelector } from 'react-redux';
import { addsalarydata, Setmonth, setuserData } from '../Redux/userActivitySlice';
import CurrencyCon from '../Components/Corrancies/CurrencyCon';

const Cards=()=>{
    const [values,setvalues]=useState()
    const [months,setmonths]=useState()
    const{ selectedmonth,exchangeRate,totalexpenses,userAllmonthData,savingdata,refresher}=useSelector(state=>state.useractivity)
    const dispatch=useDispatch();
   
    // add your salary AND SAVINGS->>>>>>>>>>>>
    function submithandler(e,id){
       e.preventDefault()
        const numericValue = Number((values*exchangeRate).toFixed(2));
       console.log("first",numericValue,typeof numericValue);

       const updatedSalaryData = {
        ...savingdata,
        [selectedmonth]: [...savingdata[selectedmonth]] 
      };

      if (id === 0){
            //ID==0 MEANS FIRST CARRD THAT IS ADD SALARY
            updatedSalaryData[selectedmonth][0] = updatedSalaryData[selectedmonth][0] + numericValue;
            console.log("first,,,,",updatedSalaryData[selectedmonth][0],exchangeRate,numericValue)
        } else {
            //ID==1 MEANS LAST CARRD THAT IS ADD SAVINGS
            updatedSalaryData[selectedmonth][1] = updatedSalaryData[selectedmonth][1] + numericValue;
        }
      dispatch(addsalarydata(updatedSalaryData));
 }

 //SET MONTH-->>
 const handleChange=(e)=>{
    // console.log("first",e.target.value);
     dispatch(Setmonth(e.target.value))
     setmonths(e.target.value);
    }
    
    useEffect(()=>{
        //SET USER DATA OF SELECTEND MONTH-->>>
       dispatch(setuserData(userAllmonthData[indexing[selectedmonth]][selectedmonth]))
    },[months,refresher])
    
    const array=[
        {
            title:'Total Income',
            Tincome:savingdata[selectedmonth][0],
            icons:<AccountBalanceIcon/>
        },
        {
            title:'Savings goals',
            Tincome:savingdata[selectedmonth][1],
            icons:<SavingsIcon/>
        },
        {
            title:'Current balance',
            Tincome:savingdata[selectedmonth][0]-totalexpenses ||0,
            icons:<AccountBalanceWalletIcon/>
        },
        {
            title:'Total expenses',
            Tincome:totalexpenses,
            icons:<MoneyIcon/>
        },
    ]
    
    //CURRENT DATE----->>
    const currentDate=new Date().toDateString();

    let currentBalance=array[2].Tincome;
    let targetSaving=array[1].Tincome;

    return (
    <Box >
        <Box >
            <Card sx={{display:'flex',justifyContent:'space-between',alignItems:'center', padding:'10px', borderRadius:'15px',marginTop:'15px'}}>
                <Box>
                    <Typography marginBottom={1} >{currentDate}</Typography>
                     <CurrencyCon/>
                </Box>
                  <FormControl sx={{ width: '130px' }} >
                    <InputLabel id="1">Month</InputLabel>
                     <Select
                        id="1"
                        value={selectedmonth}
                        label="Month"
                        onChange={handleChange}
                        width='200px'
                      >
                        {
                            month.map((month,index)=>(
                                <MenuItem key={index} value={month}>{month}</MenuItem>
                            ))
                        }
                    </Select>
                  </FormControl>
            </Card>
        </Box>
        {/* cards total income, current balance, expenses, savings */}
        <Box>
            <Grid container spacing={3} justifyContent="center">
                {
                    array.map((item,index)=>{
                    return (
                        <Grid item xs={12} sm={6} md={6} lg={3} key={index}>
                            <Card  
                                sx={{
                                    display: 'flex',
                                    borderRadius:'15px',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop:'20px',
                                    width:'100%'
                                }}
                                >
                                <CardContent>
                                    <Box sx={{display:'flex',justifyContent:'space-between'}}>
                                        <Typography gutterBottom variant="h5" component="div">
                                        {item.title}
                                        </Typography>
                                        {index === 1 && (
                                            <>
                                                {currentBalance > targetSaving ? (
                                                <Box
                                                    sx={{
                                                    border: '2px solid green',
                                                    color:'green',
                                                    height:'25px',
                                                    paddingX:'6px',
                                                    borderRadius: '6px',
                                                    display: 'inline-block',
                                                    fontSize:'15px'
                                                    }}
                                                >
                                                    achieved
                                                </Box>
                                                ) : (
                                                <Box
                                                    sx={{
                                                    border: '2px solid red',
                                                    height:'25px',
                                                    color:'red',
                                                    paddingX:'6px',
                                                    borderRadius: '6px',
                                                    display: 'inline-block',
                                                     fontSize:'15px',
                                                     whiteSpace: 'nowrap',
                                                    }}
                                                >
                                                    not achieved
                                                </Box>
                                                )}
                                            </>
                                        )}
                                    </Box>
                                    <Box sx={{display:'flex',alignItems:'center',gap:2}}>
                                        <Box sx={{borderRadius: '50%',bgcolor:'#767CFF',width: '50px',height: '50px',display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
                                        {item.icons}
                                        </Box>
                                        <Typography fontSize={'25px'}>
                                            { 
                                            ((item.Tincome)*exchangeRate).toFixed(2)
                                            }
                                        </Typography>
                                    </Box>
                                    {/* INPUT FIELD FOR ADD SALRY AND SAVINGS */}
                                    <Box marginTop={1}>
                                        {
                                            (index===0 || index==1 ) && (
                                                <form className=" gap-2 flex"
                                                onSubmit={(e) => submithandler(e,index)}
                                                >
                                                    <FormControl>
                                                        <TextField
                                                        fullWidth
                                                        label={index===0?'Add salary':'Add savings'}
                                                        name="title"
                                                        onChange={(e)=>setvalues(e.target.value)} 
                                                        type='number' 
                                                        required
                                                        />
                                                    </FormControl>
                                                    <Button type='submit' variant='outlined'>add</Button>
                                                </form>
                                            )
                                        }
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                    })
                }
            </Grid> 
        </Box>
    </Box>
  )
}

export default Cards