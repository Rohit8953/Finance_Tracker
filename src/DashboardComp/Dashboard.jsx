import React from 'react'
import Cards from './Cards'
import { Box,Container, Grid } from '@mui/material'
import CircularProgressBar from '../DashboardComp/CircularProgressBar'
import AreaChartss from './AreaChartss'
import RecentTransiction from './RecentTransiction'
const Dashboard = () => {

  return (
    <Box position="relative">
    <Box mb={3} paddingX={2}>
      <Cards />
    </Box>
    <Box>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Box mb={4}>
              <CircularProgressBar />
            </Box>
            <AreaChartss />
          </Grid>
          <Grid item xs={12} md={4}>
            <RecentTransiction />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </Box>
  )
}

export default Dashboard