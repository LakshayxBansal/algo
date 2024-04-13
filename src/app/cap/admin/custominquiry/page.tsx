
import * as React from 'react';
import { Box } from '@mui/material';

import { getServerSession } from "next-auth/next";


export default async function CustomInquiry() {
  const session = await getServerSession();
  if (session) {
    console.log("ok in session");
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <button>customize</button>
    </Box>
  );
}

