'use client'

import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Box } from '@mui/material';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Overview(props: {
    title: string,
    data: number,
  }) {    
  const d = new Date();

  return (
    <Box sx={{display: "flex", 
      flexDirection: "column", 
      justifyContent: "space-between", 
      height: "100%", 
      }}>
      <Box>
        <Typography component="h2" variant="h6" gutterBottom>
          {props.title}
        </Typography>
        <Typography component="p" variant="h4">
          {props.data}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          on {d.toDateString()}
        </Typography>
      </Box>
      <Box>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </Box>
    </Box>
  );
}
