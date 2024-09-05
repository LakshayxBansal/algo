'use client'

import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { Box } from '@mui/material';

function preventDefault(event: React.MouseEvent) {
  event.preventDefault();
}

export default function Deposits(props: {
    title: string,
    data: number
  }) {    
    const d = new Date();
  return (
    <Box sx={{pr: "50px"}}>
      <Title>{props.title}</Title>
      <Typography component="p" variant="h4">
        {props.data}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on {d.toDateString()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div>
    </Box>
  );
}
