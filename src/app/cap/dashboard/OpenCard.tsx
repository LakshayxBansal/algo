import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';
import {  getOpenEnquiriesCount } from '@/app/controllers/dashboard.controller';

export default async function OpenCard() {    
    let openEnquiriesCount = (await getOpenEnquiriesCount())[0];
    let date = new Date();
  return (
    <Paper sx={{
        p: "24px",
        height: 220,
        borderRadius: "16px",
        background: 'linear-gradient(135deg, rgba(208, 236, 254, 0.48), rgba(115, 186, 251, 0.48))',
        color: "#042174"
        }}
    >
        <Box sx={{display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between", 
        height: "100%", 
        }}>
        <Box>
            <Typography component="h2" variant="h6" gutterBottom>Open Enquiries</Typography>
            <Typography component="p" variant="h4">{openEnquiriesCount.total}</Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                on {date.toDateString()}
            </Typography>
        </Box>
        <Box>
            <Link color="primary" href="#">View details</Link>
        </Box>
        </Box>
    </Paper>
  );
}
