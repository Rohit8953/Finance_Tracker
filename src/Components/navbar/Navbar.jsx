import {AppBar, Box, Button, Divider,IconButton,Switch,Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NavSidebar from "./NavSidebar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Settoken } from "../../Redux/userSlice";
import { setDarkMode } from "../../Redux/userActivitySlice";

const Navbar = () => {

    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {token,darkMode}=useSelector(state=>state.userdetails);

    //LOGOUT---->
    const logouthandler=()=>{
          dispatch(Settoken(null))
          navigate('/');
    }

  return (
    <AppBar color="inherit" >
      <Toolbar>
        <Box sx={{display:{ xs: "block", sm: "none"}}}>
          {/* SIDEBAR----> */}
          <NavSidebar>
            <IconButton
              color="inherit"
              sx={{ color: "blue", marginLeft: "-30px", display: { xs: "block", sm: "none" },
              }}
            >
              <MenuIcon style={{ fontSize: 40 }} />
            </IconButton>
          </NavSidebar>
        </Box>
        {/* APPLICATION LOGO */}
        <Typography variant="h6" flexGrow={1}>
            <Link to='/' >
              <Typography fontSize={'20px'} component="span" display="inline" >F</Typography> {" "}
              <Typography fontSize={'20px'} component="span" display="inline" color='#6D6DF9'>Tracker</Typography> 
             </Link>
        </Typography>
        
        <Box variant='contained'
          flexGrow={1}
          component="ul"  sx={{display:{ xs: "none", sm: "block"}}} >
         <Box sx={{ border: '2px solid #6D6DF9', color:'#6D6DF9', width: 'fit-content' , borderRadius:'6px',padding:'4px', px:'10px'}}>
            <Link  to={token ?"/dashboard":"/login"}>Dashboard</Link>
          </Box>
        </Box>
         {/* TOGGLE BETWEEN DARKMODE AND LIGHT MODE */}
        <Box>
          <Switch
              checked={darkMode}
              onChange={()=>dispatch(setDarkMode())}
              inputProps={{ 'aria-label': 'controlled' }}
            />
       </Box>

         <IconButton disableRipple sx={{ display: { xs: "none", sm: "block" } }}>
            <AccountCircleIcon  sx={{color:'#6D6DF9',fontSize:'40px'}}  />
         </IconButton>

        {/* LOGIN SIGNUP AND LOGOUT BUTTON */}
        <Box>
          {
            token?(
                <Button variant="contained" sx={{marginLeft:'6px',bgcolor:'#6D6DF9',color:'white'}} onClick={logouthandler}>Logout</Button>
            ):(
              <Box display={"flex"}>
                <Button variant="contained" 
                 sx={{
                  marginLeft: '6px',
                  bgcolor: '#6D6DF9',
                  color: 'white',
                  fontSize: { xs: '12px', sm: '15px', md: 'auto' },
                  display: { xs: 'none', sm: 'block' }
                }} 
                onClick={()=>navigate('/login')}>Login</Button>
                <Button variant="contained" sx={{marginLeft:'6px',bgcolor:'#6D6DF9',color:'white',fontSize: { xs: '12px', sm: '15px', md: 'auto' }}} onClick={()=>navigate('/signup')}>Signup</Button>
              </Box>
            )
          }
        </Box>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

export default Navbar;