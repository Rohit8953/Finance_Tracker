import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

const Dashboardpage = () =>{
  const{darkMode}=useSelector(state=>state.useractivity)
  return (
    <Box sx={{ display: 'flex', marginTop:'70px', flexDirection:{ xs:'column',sm:'row'}}}>
      {/*<< Left--------side OF DASHBOARD >> */}
      <Box>
        <List sx={{display:'flex', flexDirection:{ xs:'row', sm:'column',justifyContent:'space-between'}}}>
            <Link to={'/dashboard'}>
              <ListItemButton >
                <ListItemIcon>
                  <DashboardIcon sx={{color:'#6D6DF9'}} />
                </ListItemIcon>
                <ListItemText sx={{display:{ xs:'none',sm:'block'}}}>Dashboard</ListItemText>
              </ListItemButton>
            </Link>
            <Divider/>
            <Link to={'/dashboard/transictionm'}>
              <ListItemButton >
                <ListItemIcon>
                  <ReceiptLongIcon sx={{color:'#6D6DF9'}}/>
                </ListItemIcon>
                <ListItemText sx={{display:{ xs:'none',sm:'block'}}}>Transactions</ListItemText>
              </ListItemButton>
            </Link>
            <Divider/>
          </List>
       </Box>
      {/* R<<<<<<<ight side BAR OF DASHBOARD >>>>> */}
       <Box sx={{
          bgcolor: darkMode ? '#6D6DF9' : '#F0F0F0', 
          borderRadius: '15px',
          width: '100%'
        }}>
           <Outlet/>
       </Box>
    </Box>
  )
}

export default Dashboardpage