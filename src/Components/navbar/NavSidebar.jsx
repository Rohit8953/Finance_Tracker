import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography } from '@mui/material';

export default function NavSidebar({children}){
  const [state, setState] = React.useState({
    left: false,
  });
  const {token}=useSelector(state=>state.userdetails);

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const sections=['Dashboard'];

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      
       <Box variant="h6" marginLeft={'20px'} sx={{display:'flex',alignItems:'center'}} marginY={'auto'} height={'68px'} flexGrow={1}>
            <Link to='/' >
              <Typography fontSize={'30px'} component="span" display="inline" >F</Typography> {" "}
              <Typography fontSize={'30px'} component="span" display="inline" color='#6D6DF9'>Tracker</Typography> 
             </Link>
        </Box>
      <Divider />
      <List>
        {sections.map((text, index) =>(
        <Link key={index} to={token?'/dashboard':'/login'}>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon sx={{color:'#6D6DF9'}} />  
              </ListItemIcon>
              <ListItemText primary={text}/>
            </ListItemButton>
          </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );


  return (
    <div>
        <React.Fragment key={"left"}>
          <Button onClick={toggleDrawer("left", true)}>{children}</Button>
          <Drawer
            anchor={"left"}
            open={state["left"]}
            onClose={toggleDrawer("left", false)}
          >
            {list("left")}
          </Drawer>
        </React.Fragment>
    </div>
  );
}
