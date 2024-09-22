import React, { useState } from 'react';
import { Box, Button, Typography, Card, Grid, Modal, TextField, MenuItem, IconButton, Icon, FormControl, Select, InputLabel, FormLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { CgClose } from 'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import {  setpopup, updateData } from '../Redux/userActivitySlice';
import DateAndTime from '../helper/timeandDate';

const categories = ["Rent", "Health", "Grocery", "Shopping", "Entertainment"];

const UpdateTransaction=()=>{
  const{ updatepopup,dataforUpdate}=useSelector(state=>state.useractivity)

  const [data, setData] = useState({
    id: dataforUpdate.id,
    title: dataforUpdate.title,
    category: dataforUpdate.category,
    expenses: Number(dataforUpdate.expenses),
    date:'',
    mode: dataforUpdate.mode
  });

  console.log("firstkasdjf",data.expenses);

  const dispatch=useDispatch();
  //UPDATE DATA----->>>
  const submithandler=(e)=>{
    e.preventDefault();
    const DATE=DateAndTime();
    const newEntry = {
      ...data,
      date:DATE,
    };
    setData(newEntry)
    dispatch(updateData(data))
    dispatch(setpopup())
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
      <Modal open={updatepopup} onClose={() =>dispatch(setpopup())}>
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
            <Typography variant="h6">UpdateTransaction Transaction</Typography>
            <IconButton  onClick={() => dispatch(setpopup())}>
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
              Update
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default UpdateTransaction;