import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setExchangeRate } from "../../Redux/userActivitySlice";
import {currencydata} from '../../Data/data'

const CurrencyCon = () => {
    const [Currency, setToCurrency] = useState('INR');
    const dispatch=useDispatch();

    // fetch currency name and conversion rate.....
    useEffect(() => {
        const fetchCurrencies = async () => {
          const response = await axios.get('https://api.exchangerate-api.com/v4/latest/INR');
        //setCurrencies(Object.keys(response.data.rates));
          dispatch(setExchangeRate(response.data.rates[Currency]));
        };
        fetchCurrencies();
      }, [Currency]);

  return (
    <Box>
      <FormControl sx={{ width: "80px",  }}>
        <InputLabel id="1">Currency</InputLabel>
        <Select id="1" value={Currency} label="Currency"
          onChange={(e)=>setToCurrency(e.target.value)}
          sx={{height:'40px',fontSize:'15px'}}
        >
         {
            currencydata.map((data,index)=>(
                <MenuItem index={index} value={data}>{data}</MenuItem>
            ))
         }
        </Select>
      </FormControl>
    </Box>
  );
};

export default CurrencyCon;
