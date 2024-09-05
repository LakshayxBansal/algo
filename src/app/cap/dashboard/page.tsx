
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import CustomPaper from './CustomPaper';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import Title from './Title';
import { Typography } from '@mui/material';
import Link from 'next/link';
import { BarChart, LineChart } from '@mui/x-charts';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import StackedBarChart from './BarChart';
import CompositionChart from './CompositionChart';


export default async function Dashboard() {
  const session = await getSession();
  if (session?.user.dbInfo) {
    return (
      <Box>
        <CssBaseline />
        <Box sx={{
          display: "flex",
          width: "90%", 
          margin: "auto", 
          justifyContent: "space-between", 
          flexWrap: "wrap", 
          rowGap: 2, 
          paddingTop: 2, 
          alignItems: 'center',
          }}>
        
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 200,
              pr: 2
            }}
          >
            <Deposits title="Total Open" data={5}/>
          </Paper>
          <Paper 
            sx={{
              p: 2,
              height: 200,
            }}
          >
            <Deposits title="Unassigned" data={5}/>
          </Paper>
          <Paper
            sx={{
              p: 2,
              height: 200,
            }}
          >
            <Deposits title="Closed" data={5}/>
          </Paper>
          <Paper
            sx={{
              p: 2,
              height: 200,
            }}
          >
            <Deposits title="Average" data={5}/>
          </Paper>
        </Box>
        <Box>
          <Box sx={{display: "flex", flexWrap: 'wrap', justifyContent: "center"}}>
            <Paper
              sx={{
                // p: 2,
                m: 2,
                display: "flex",
                flexDirection: "column",
                width: "45%",
                height: 300
              }}
            >
            <CompositionChart/>
            </Paper>
            <Paper
              sx={{
                // p: 2,
                m: 2,
                display: "flex",
                flexDirection: "column",
                width: "45%",
                height: 300
              }}
            >
              <CompositionChart/>
            </Paper>
          </Box>
        </Box>
        <Paper sx={{m: 3, p: 2}}>
          <Orders/>
        </Paper>
        {/* <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <CustomPaper />
                  <Chart />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box> */}
      </Box>
    );

  } else {
    redirect('/signin');
  }
}

