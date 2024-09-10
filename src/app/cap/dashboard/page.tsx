
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import Orders from './Orders';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import { getClosedEnquiries, getOpenEnquiries } from '@/app/controllers/dashboard.controller';
import Chart from './Chart';

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
      <Box sx={{width: "100%", p: 2}}>
        <Box sx={{
          display: "flex",
          width: "95%", 
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
              height: 200,
              width: 300,
            }}
          >
            <Deposits title="Total Open Enquiries" data={openEnquiries.length}/>
          </Paper>
          <Paper 
            sx={{
              p: 2,
              height: 200,
              width: 300
            }}
          >
            <Deposits title="Unassigned Enquiries" data={unassignedEnquiries.length}/>
          </Paper>
          <Paper
            sx={{
              p: 2,
              height: 200,
              width: 300
            }}
          >
            <Deposits title="Closed Enquiries" data={closedEnquiries.length}/>
          </Paper>
          <Paper
            sx={{
              p: 2,
              height: 200,
              width: 300
            }}
          >
            <Deposits title="Average Age" data={5}/>
          </Paper>
        </Box>
        <Box sx={{width: "95%", display: "flex", flexWrap: 'wrap', justifyContent: "space-between", columnGap: 2, margin: "auto", my: 5, rowGap: 2}}>
            <Paper
              sx={{
                // p: 2,
                // m: 2,
                display: "flex",
                flexDirection: "column",
                width: "49%",
                height: 300,
                maxWidth: 700,
                minWidth: 350,
              }}
            >
            <Chart openEnquiries={openEnquiries} closedEnquiries={closedEnquiries}/>
            </Paper>
            <Paper
              sx={{
                // p: 2,
                // m: 2,
                display: "flex",
                flexDirection: "column",
                width: "49%",
                height: 300,
                maxWidth: 700,
                minWidth: 350,
              }}
              >
                <Chart openEnquiries={openEnquiries} closedEnquiries={closedEnquiries}/>
            </Paper>
        </Box>
        <Box sx={{width: "95%", margin: "auto"}}>
          <Paper elevation={2} sx={{p: 2}}>
            <Orders openEnquiries={openEnquiries}/>
          </Paper>
        </Box>
      </Box>
    );

  } else {
    redirect('/signin');
  }
}

