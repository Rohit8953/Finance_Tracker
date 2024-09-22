import React, { useState, useMemo } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Switch, Box, Typography } from '@mui/material';
import Navbar from "./Components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LandingPage from './Pages/LandingPage/LandingPage'
import Dashboardpage from "./Pages/DashboardPage/Dashboardpage";
import SignUp from "./Pages/LoginSignUp/SignUp";
import LogIn from './Pages/LoginSignUp/LogIn'
import Dashboard from "./DashboardComp/Dashboard";
import TransictionM from './DashboardComp/TransactionM'
import { useSelector } from 'react-redux';
function App() {
  //theme for darkmode and light->>>
   const{darkMode}=useSelector(state=>state.useractivity)
   const theme = useMemo(() => 
     createTheme({
       palette: {
         mode: darkMode ? 'dark' : 'light',
       },
     }),
     [darkMode]
   );

return (
   <ThemeProvider theme={theme}>
      <CssBaseline />
    <Box >
      <Navbar/>
      <Routes>
         <Route path="/" element={<LandingPage/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/login" element={<LogIn/>}/>
         <Route path="/dashboard" element={<Dashboardpage/>}>
            <Route path="/dashboard" element={< Dashboard/>}/>
            <Route path="/dashboard/transictionm" element={< TransictionM/>}/>
         </Route>
      </Routes>
   </Box>
   </ThemeProvider>
  );
};
export default App;
