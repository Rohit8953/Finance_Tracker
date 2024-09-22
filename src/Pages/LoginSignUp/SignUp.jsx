import { Box, Button, Container, FormControl, Grid, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import * as Yup from 'yup';
import loginpage from '../../assets/loginpage.jpg'
import { getAuth,createUserWithEmailAndPassword } from 'firebase/auth';
import {app} from '../../Firebase/firebase'
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

const SignUp = () => {
    const [errors, setErrors] = useState({});
    const [formdata, setFormdata] = useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  const navigate=useNavigate();

  // YUP LIBRARY FOR FORM VALIDATION
  const validationSchema = Yup.object({
    username: Yup.string().required('First name is Required'),
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], "Passwords didn't match")
      .required(  'Confirm password is required'),
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormdata({
      ...formdata,
      [name]: value,
    });
  };

const datavalidation=async()=>{
  // CHECK VALIDATION 
  try {
    await validationSchema.validate(formdata, { abortEarly: false });
  } catch (error) {
    const newErrors = {};
    error.inner.forEach((err) => {
      newErrors[err.path] = err.message;  
    });
    setErrors(newErrors);
    console.log('Validation errors are ->>>', newErrors);
  }
  return errors
}


const handleSubmit = async (e) => {
    console.log("first")
    e.preventDefault(); 
    const isValid = await datavalidation();
   if (Object.keys(isValid).length > 0) {
      return;
    }

    // Proceed with Firebase authentication->>>>>>
    try {
      const { email, password } = formdata; 
      const response=await createUserWithEmailAndPassword(auth, email, password);
      console.log("first firbase data",response)
      alert('Signup Successful');
      
      if (response) {
        navigate('/login')
      }

    } catch (error){
      console.error('Error during signup:', error.message);
      setErrors({ firebase: error.message });
    }
  };

  return (
    <Grid spacing={1} margin="auto" container width="100%" height={'100vh'} alignItems={'center'}>
      <Grid item xs={12} sm={6} md={6}>
        <img src={loginpage} style={{objectFit:'cover', width:'100%',height:'100%'}} loading="lazy" alt="loginpage" />
      </Grid>
      <Grid item xs={12} sm={6} md={6} padding={1} marginY="auto">
        <Container
          maxWidth="sm"
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
            Sign up
          </Typography>
          <br/>

          <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} onSubmit={handleSubmit}>
            <FormControl>
              <TextField
                label="Username"
                name="username"
                required
                fullWidth
                id="username"
                placeholder="Rohit"
                onChange={changeHandler}
                error={!!errors.username}
                helperText={errors.username}
                color="primary"
              />
            </FormControl>

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

            <FormControl>
              <TextField
                label="Confirm Password"
                required
                fullWidth
                 name="confirmPassword"
                placeholder="••••••"
                type="password"
                 id="confirmPassword"
                onChange={changeHandler}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                variant="outlined" />
            </FormControl>

            <Button  type="submit" sx={{bgcolor:'#6D6DF9'}} fullWidth variant="contained">
              Sign up
            </Button>

            <Typography sx={{ textAlign: 'center' }}>
               Already have an account?{' '}
              <Link href="/login" variant="body2">
                 Login
              </Link>
            </Typography>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignUp;
