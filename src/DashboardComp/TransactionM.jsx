import { React,useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteTransaction, setdataforUpdate, setpopup } from '../Redux/userActivitySlice';
import { Box } from '@mui/material';
import AddTransaction from './AddTransaction';
import UpdateTransaction from './UpdateTransaction';

const tableheading=["Sr no","Title","Amount","Date","Category","Mode","Delete","Edit"]

export default function TransactionM() {

  const dispatch=useDispatch();
  const{userData,updatepopup,exchangeRate}=useSelector(state=>state.useractivity);

  // update the added transactions--->>>
  const updatehandler=(rowdatas)=>{
    dispatch(setpopup());
    dispatch(setdataforUpdate(rowdatas))
  }

  return (
    <Box sx={{ padding: {xs:1, sm: 2, md: 4 } }}>
       <Box>
          <AddTransaction/>
       </Box>
       <Box marginTop={3}>
          <TableContainer component={Paper} sx={{ borderRadius:'15px'}}>
            <Table sx={{ minWidth: 650 }} >
              <TableHead>
                <TableRow>
                  {
                  tableheading.map((data,index)=>{
                    return (
                      <TableCell key={index} sx={{fontFamily:'500', fontSize:'20px'}} align='left'>{data}</TableCell>
                    )
                  })
                  }
                </TableRow>
              </TableHead>
              <TableBody>
                {userData.map((row,index) => (
                  <TableRow
                    key={row.name}
                  >
                    <TableCell component="th" scope="row">{index+1}</TableCell>
                    <TableCell component="th" scope="row">{row.title}</TableCell>
                    <TableCell component="th" scope="row">
                      {((row.expenses)*exchangeRate).toFixed(2)}
                    </TableCell>
                    <TableCell component="th" scope="row">{row.date}</TableCell>
                    <TableCell component="th" scope="row">{row.category}</TableCell>
                    <TableCell component="th" scope="row">{row.mode}</TableCell>
                    <TableCell onClick={()=>dispatch(deleteTransaction(row))}  component="th" scope="row"
                       sx={{
                        cursor: 'pointer', 
                        '&:hover .icons': { 
                          bgcolor: 'red', 
                          transform: 'scale(1.2)', 
                          borderRadius: '50%', 
                        },
                      }}
                      ><DeleteIcon
                        className="icons" 
                        sx={{
                          transition: 'all 0.2s ease',
                          padding: '4px', 
                        }}
                      /></TableCell>
                    <TableCell component="th" scope="row" onClick={()=>updatehandler(row)}
                      sx={{
                        cursor: 'pointer', 
                        '&:hover .icon': { 
                          bgcolor: 'green', 
                          transform: 'scale(1.2)', 
                          borderRadius: '50%', 
                        },
                      }}
                      ><CreateIcon
                        className="icon" 
                        sx={{
                          transition: 'all 0.2s ease',
                          padding: '4px', 
                        }}
                      /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       </Box>
       {
        updatepopup && (
          <UpdateTransaction/>
        )
       }
    </Box>
  );
}