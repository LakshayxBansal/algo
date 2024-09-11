
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Overview from './Overview';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import { getClosedEnquiries, getOpenEnquiries } from '@/app/controllers/dashboard.controller';
import Chart from './Chart';
import Enquiries from './Enquiries';
import { Grid } from '@mui/material';

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
      <Box sx={{width: "100%", py: 2, bgcolor: "#F9FAFB"}}>
        <Grid container spacing={3} sx={{width: "95%", margin: "auto", mb: 0}}>
          <Grid item xs={12} sm={6} md={3} >
            <Paper
              sx={{
                p: "24px",
                height: 220,
                borderRadius: "16px",
                background: 'linear-gradient(135deg, rgba(208, 236, 254, 0.48), rgba(115, 186, 251, 0.48))',
                color: "#042174"
              }}
              >
              <Overview title="Open Enquiries" data={openEnquiries.length} />
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: "24px",
              height: 220,
              borderRadius: "16px",
              background: 'linear-gradient(135deg, rgba(255, 245, 204, 0.48), rgba(255, 214, 102, 0.48))',
              color: "#7A4100"
            }}
            >
            <Overview title="Closed Enquiries" data={closedEnquiries.length}/>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Paper 
            sx={{
              p: "24px",
              height: 220,
              borderRadius: "16px",
              background: 'linear-gradient(135deg, rgba(239, 214, 255, 0.48), rgba(198, 132, 255, 0.48))',
              color: "#27097A"
            }}
            >
            <Overview title="Unassigned Enquiries" data={unassignedEnquiries.length}/>
          </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              p: "24px",
              height: 220,
              borderRadius: "16px",
              background: 'linear-gradient(135deg, rgba(255, 233, 213, 0.48), rgba(255, 172, 130, 0.48))',
              color: "#7A0916"
            }}
          >
            <Overview title="Average Age" data={5}/>
          </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{width: "95%", margin: "auto", my: 2}}>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
              }}
              >
              <Chart openEnquiries={openEnquiries} closedEnquiries={closedEnquiries}/>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              sx={{
                // p: 2,
                // m: 2,
                display: "flex",
                flexDirection: "column",
                // width: "48%",
                // height: 30,
                borderRadius: "16px",
              }}
              >
              <Chart openEnquiries={openEnquiries} closedEnquiries={closedEnquiries}/>
            </Paper>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{width: "95%", margin: "auto"}}>
          <Grid item xs={12} sm={12} md={12}>
            <Enquiries openEnquiries={openEnquiries}/>
          </Grid>
        </Grid>
      </Box>
    );

  } else {
    redirect('/signin');
  }
}

