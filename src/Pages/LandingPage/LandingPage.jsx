import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import mobiles from '../../assets/mobiles.png'
import Footer from '../../Components/footer/Footer'
import {data} from '../../Data/data'

const LandingPage = () => {

  return (
    <Box>
      <Box position={'relative'} mx={'10px'} marginTop={'100px'} 
        sx={{ bgcolor: '#6D6DF9', borderRadius: '16px', 
          padding: { xs: 3, sm: 5 }, 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          minHeight: '300px' 
        }}
      >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} alignContent={'center'}>
          <Typography
            variant="h3"
            component="h1"
            sx={{
              fontWeight: 'bold',
              zIndex: 2, 
            }}
          >
            Earning rewards has never been so easy
          </Typography>
          <Typography>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut aliquid minus dolor eius autem debitis fuga culpa et sunt tempora.</Typography>
        </Grid>

    
          <Grid item xs={12} sm={12} md={6}>
            {/* Image fasdf */}
            <img
              src={mobiles}
              alt="Phone 1"
              style={{
                width: '100%',
                height: '100%',
                transform: 'rotate(15deg)',
                zIndex: 1,
              }}
            />
          </Grid>
      </Grid>
      </Box>

      <Box sx={{ textAlign: 'center', padding: { xs: 2, sm: 4, md: 6 } }}>
      
        <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 'bold', marginBottom: 2 }}>
          How It Works
        </Typography>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', marginBottom: 4 }}>
          What we will do to track our Finance?
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {
            data.map((items,inedex)=>{
              return (
                <Grid item xs={12} sm={6} md={4}>
                  <Box>
                    <img
                      src={items.img}
                      alt="Track your savings"
                      style={{ width: '100%', maxHeight: '150px', objectFit: 'contain' }}
                    />
                    <Typography variant="h6" sx={{ fontWeight: 'bold', marginTop: 2 }}>
                      {items.title} <span style={{ color: '#6D6DF9' }}>{items.subtitle}</span>
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {items.description}
                    </Typography>
                  </Box>
                </Grid>
              )
            })
          }
        </Grid>
      </Box>
      {/* FOOTER SECTION----->>>>*/}
      <Box>
        <Footer/>
      </Box>
    </Box>
  )
}

export default LandingPage