
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import { getClosedEnquiries, getOpenEnquiries } from '@/app/controllers/dashboard.controller';
import Chart from './Chart';
import ExecutiveEnquiryList from './ExecutiveEnquiryList';
import { Grid } from '@mui/material';
import EnquiryList from './EnquiryList';
import AverageAgeCard from './AverageAgeCard';
import ClosedCard from './ClosedCard';
import OpenCard from './OpenCard';
import UnassignedCard from './UnassignedCard';

const getUnassignedEnquiries = (openEnquiries: any) => {
  const result = openEnquiries.filter((item: any) => {
    return item.allocated_to === null;
  })
  return result;
}
export default async function Dashboard() {
  const session = await getSession();
  if (session?.user.dbInfo) {
    let [openEnquiries, closedEnquiries] = await Promise.all([getOpenEnquiries(), getClosedEnquiries()]);
    const unassignedEnquiries = getUnassignedEnquiries(openEnquiries);
    
    return (
      <Box sx= {{maxWidth: "100%", bgcolor: "#F9FAFB"}}>
        <Box sx={{ py: 3, maxWidth:"90vw", margin:"auto"}}>
          <Grid container spacing={3} sx={{ }}>
            <Grid item xs={11} sm={6} md={3} sx={{margin: "auto"}}>
              <OpenCard data={openEnquiries.length}/>
            </Grid>
            <Grid item xs={11} sm={6} md={3} sx={{margin: "auto"}}>
              <UnassignedCard data={unassignedEnquiries.length}/>
            </Grid>
            <Grid item xs={11} sm={6} md={3} sx={{margin: "auto"}}>
              <ClosedCard data={closedEnquiries.length} date={closedEnquiries.at(-1).date}/>
            </Grid>
            <Grid item xs={11} sm={6} md={3} sx={{margin: "auto"}}>
              <AverageAgeCard data={closedEnquiries}/>
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{pt: 4}}>
            <Grid item xs={11} sm={12} md={6} sx={{margin: "auto"}}>
              <Paper
                sx={{
                  borderRadius: "16px",
                }}
              >
                <Chart openEnquiries={openEnquiries} closedEnquiries={closedEnquiries} />
              </Paper>
            </Grid>
            <Grid item xs={11} sm={12} md={6} sx={{margin: "auto"}}>
                <EnquiryList openEnquiries={openEnquiries} />
            </Grid>
          </Grid>
          <Grid container spacing={3} sx={{mt: 4}}>
            <Grid item xs={11} sm={12} md={12} sx={{margin: "auto"}}>
              <ExecutiveEnquiryList openEnquiries={openEnquiries} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    );

  } else {
    redirect('/signin');
  }
}