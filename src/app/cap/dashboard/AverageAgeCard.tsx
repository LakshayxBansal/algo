'use client'
import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Box, Paper } from '@mui/material';

export default function AverageAgeCard(props: {
    data: any
  }) {
    const sinceDate = props.data.at(-1).date;
  return (
    <Paper
        sx={{
            p: "24px",
            height: 220,
            borderRadius: "16px",
            background: 'linear-gradient(135deg, rgba(255, 233, 213, 0.48), rgba(255, 172, 130, 0.48))',
            color: "#7A0916"
        }}
    >
        <Box sx={{display: "flex", 
        flexDirection: "column", 
        justifyContent: "space-between", 
        height: "100%", 
        }}>
        <Box>
            <Typography component="h2" variant="h6" gutterBottom>Average Age</Typography>
            <Typography component="p" variant="h4">5 Days</Typography>
            <Typography color="text.secondary" sx={{ flex: 1 }}>
                since {sinceDate.toDateString()}
            </Typography>
        </Box>
        <Box>
            <Link color="primary" href="#">
            View balance
            </Link>
        </Box>
        </Box>
    </Paper>
  );
}
