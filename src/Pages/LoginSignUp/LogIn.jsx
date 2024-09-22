import { Box, Button, Container, FormControl, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import signuppage from '../../assets/signuppage.jpg';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../Firebase/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { SetisLogin, Settoken } from '../../Redux/userSlice';

const auth=getAuth(app);
const Login = () => {

  const dispatch=useDispatch()
  const {islogin}=useSelector(state=>state.userdetails);
  const navigate=useNavigate();
  const [errors, setErrors] = useState({});
  const [formdata, setFormdata] = useState({
    email: '',
    password: '',
  });

  // FORM VALIDATION LOGIC USING YUP
  const validationSchema = Yup.object({
    email: Yup.string()
       .required('Email is Required')
      .matches(/[@]/,  'Email must be example@gmail.com'),
    password: Yup.string()
       .required( 'Password is required')
      .min(8, 'Password must be at least 8 characters' )
      .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one symbol')
      .matches(/[0-9]/,   'Password must contain at least one number')
      .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
       .matches(/[a-z]/,   'Password must contain  at least one lowercase  letter'),
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

const Validations=async()=>{
    // CHECK VALIDATION--->.>
    try {
      await validationSchema.validate(formdata, { abortEarly: false });
    } catch (error) {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;  
      });
      setErrors(newErrors);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    const isValid=Validations();
   if (Object.keys(isValid).length > 0){
     return;
   }

   try {
    const { email, password } = formdata; 
    const response=await signInWithEmailAndPassword(auth, email, password);
    console.log("first firbase data",response.user.accessToken)
    alert('Login Successful');
    if (response) {
      navigate('/');
      dispatch(SetisLogin())
      dispatch(Settoken(response.user.accessToken))
    }

  } catch (error){
    console.error('Error during signup:', error.message);
    setErrors({ firebase: error.message });
  }
  };

  return (
    <Grid spacing={1} margin="auto" container width="100%" height={'100vh'} alignItems={'center'}>
      <Grid item xs={12} sm={6} md={6}>
        <img src={signuppage} style={{objectFit:'cover', width:'100%',height:'100%'}} loading="lazy" alt="signupImage" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} padding={1} marginY="auto">
        <Container
          maxWidth='sm'
          marginX="auto"
          style={{
            boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.2)',
            padding: '10px',
            borderRadius: '5px',
          }}
        >
          <Typography
            component="h1"
            textAlign="center"
            variant="h4"
          >
            Login
          </Typography>
          <br />

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>

            <FormControl>
              <TextField
                label="Email"
                required
                fullWidth
                id="email"
                placeholder="your@email.com"
                name="email"
                onChange={changeHandler}
                error={!!errors.email}
                helperText={errors.email}
                variant="outlined"
              />
            </FormControl>

            <FormControl>
              <TextField
                label="Password"
                required
                fullWidth
                name="password"
                placeholder="••••••."
               type="password"
                id="password"
                onChange={changeHandler}
                error={!!errors.password}
                helperText={errors.password}
                variant="outlined"
              />
            </FormControl>

            <Button type="submit" fullWidth sx={{bgcolor:'#6D6DF9'}} variant="contained">
              Login
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
               Have you not an account? {" "}
              <Link href="/signup"  variant="body2">
                Sign in
              </Link>
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Login;
