import React from 'react'
import { Box, Typography, Container, Link, IconButton } from '@mui/material';
import { Facebook, Twitter, LinkedIn, Instagram } from '@mui/icons-material';
const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#6D6DF9',
        color: 'white', padding: '20px 0',
        marginTop: 'auto', textAlign: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="h6" gutterBottom>
          Finance Tracker
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'center', gap: '20px', mb: 2 }}>
          <Link href="/" color="inherit" underline="none">
            Home
          </Link>
          <Link href="/" color="inherit" underline="none">
            Features
          </Link>
          <Link href="/" color="inherit" underline="none">
            Pricing
          </Link>
          <Link href="/" color="inherit" underline="none">
            Contact Us
          </Link>
        </Box>

        <Box sx={{ mb: 2 }}>
          <IconButton href="/"  color="inherit">
            <Facebook />
          </IconButton>
          <IconButton href="/" color="inherit">
            <Twitter />
          </IconButton>
          <IconButton href="/"  color="inherit">
            <LinkedIn />
          </IconButton>
          <IconButton href="/"  color="inherit">
            <Instagram />
          </IconButton>
        </Box>

        <Typography  color="inherit">
          &copy; {new Date().getFullYear()} Finance Tracker. All rights reserved....
        </Typography>
      </Container>
    </Box>
  )
}

export default Footer