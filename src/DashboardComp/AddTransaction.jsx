import React, { useState } from 'react';
import { Box, Button, Typography, Card, Grid, Modal, TextField, MenuItem, IconButton, Icon, FormControl, Select, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { CgClose } from 'react-icons/cg';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { addnewTransaction, setRefresher } from '../Redux/userActivitySlice';
import DateAndTime from '../helper/timeandDate';
import {categories} from '../Data/data'



const AddTransaction=()=>{
  
  const [popup, setPopup] = useState(false);
  const{ userData,userAllmonthData,selectedmonth,refresher}=useSelector(state=>state.useractivity)

  
  const [data, setData] = useState({
    id: userData.length+1,
    title: '',
    category: '',
    date:'',
    mode: '',
    expenses:0,
  });

  const dispatch=useDispatch();
  const submithandler=(e)=>{
    e.preventDefault();
    const DATE=DateAndTime()
    const newEntry = {
      ...data,
      date:DATE,
      id: userData.length + 1, 
    };
    setData(newEntry)

     dispatch(addnewTransaction(data))
     dispatch(setRefresher());
    console.log("first,...", userAllmonthData);
    setPopup(false)
  } 

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: name === 'expenses' ? parseFloat(value): value,
    }));
  };


  return (
    <Box component="main" className="relative">
      <Card sx={{ display: 'flex',borderRadius:'15px' ,justifyContent: 'space-between',alignItems:'center',height:'80px',paddingX:'6px' }}>
        <Typography variant="h4" sx={{fontSize:{xs: '20px', sm:'40px'}}} color="textPrimary">
          Add your Transaction
        </Typography>
        <Button sx={{ height: 'fit-content', bgcolor:'#6D6DF9'}}
          variant="contained"
          endIcon={<AddCircleOutlineIcon />}
          onClick={() => setPopup(true)}
        >
          ADD
          
        </Button>
      </Card>

      {/* add new transaction======popup*/}
      <Modal open={popup} onClose={() => setPopup(false)}>
        <Box
          sx={{ position: 'absolute', top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Box display="flex"  justifyContent="space-between" alignItems="center" mb={3}>
            <Typography variant="h6">Add Transaction</Typography>
            <IconButton  onClick={() => setPopup(false)}>
              <CgClose />
            </IconButton>
          </Box>

          {/* Form Section */}
          <form className="grid gap-3" onSubmit={(e) => submithandler(e)}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={data.title}
              onChange={handleOnChange}  
              required
            />
            <FormControl fullWidth>
              <InputLabel required>Category</InputLabel>
              <Select
                value={data.category}
                label="Category"
                name="category"
                onChange={handleOnChange}  
                required
              >
                <MenuItem value="">
                  <Typography>Select Category</Typography>
                </MenuItem>
                {categories.map((el) => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              label="Expenses"
              type="number"
              name="expenses"
              value={data.expenses}
              onChange={handleOnChange} 
              required
            />
            <FormControl required>
              <FormLabel id="demo-row-radio-buttons-group-label">Payment Mode</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="mode"
                value={data.mode}
                onChange={handleOnChange}  
              >
                <FormControlLabel value="Cash" control={<Radio />} label="Cash" />
                <FormControlLabel value="Online" control={<Radio />} label="Online" />
              </RadioGroup>
            </FormControl>
            <Button variant="contained" sx={{bgcolor:'#6D6DF9'}} type="submit">
              Upload
            </Button>
          </form>
        </Box>
      </Modal>

    </Box>
  );
};

export default AddTransaction;
