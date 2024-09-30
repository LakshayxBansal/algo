import * as React from 'react';
import { getSession }  from '../services/session.service';
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
      <Box>
        <CompanyEntityList/>
      </Box>
      <Box>
        <InviteEntityList/>
      </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}