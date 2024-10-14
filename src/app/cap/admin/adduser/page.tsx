import * as React from 'react';
import { Box } from '@mui/material';
import { redirect } from 'next/navigation';
import InviteList from './InviteList';
import UserList from './UserList';
import { getSession } from '../../../services/session.service';

export default async function AddUser() {
  const session = await getSession();
  if (session) {
    return (
      <Box sx={{ height: "100vh" }}>
        <Box sx={{ height: "50vh", overflow: "scroll" }}>
          <UserList />
        </Box>
        <Box sx={{ height: "50vh", overflow: "scroll" }}>
          <InviteList />
        </Box>
      </Box>
    );
  } else {
    redirect("/signin");
  }
}