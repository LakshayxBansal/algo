import * as React from 'react';
import { getSession } from '../services/session.service';
import { redirect } from 'next/navigation';
import CompanyEntityList from './CompanyEntityList';
import InviteEntityList from './InviteEntityList';
import { Box } from '@mui/material';

export default async function Companies() {
  const session = await getSession();
  console.log(session);
  if (session) {

    return (
      <>
        <Box sx={{ height: "100vh" }}>
          <Box sx={{ height: "40vh" }}>
            <CompanyEntityList />
          </Box>
          <Box sx={{ height: "40vh" }}>
            <InviteEntityList />
          </Box>
        </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}