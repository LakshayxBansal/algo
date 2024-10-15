import * as React from 'react';
import { Box,Accordion,AccordionSummary,AccordionDetails } from '@mui/material';
import { redirect } from 'next/navigation';
import InviteList from './InviteList';
import UserList from './UserList';
import { getSession } from '../../../services/session.service';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default async function AddUser(){
  const session = await getSession();
  if (session) {
    return (
      <Box sx={{ height: "100vh" }}>
        <Box sx={{ height: "50vh", overflow: "scroll" }}>
          <UserList />
        </Box>
        <Box sx={{ height: "50vh",marginTop : "1rem", overflow: "scroll" }}>
        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Invited User
        </AccordionSummary>
        <AccordionDetails>
          <InviteList companyId={session.user.dbInfo.id}/>
        </AccordionDetails>
      </Accordion>
        </Box>
      </Box>
    );
  } else {
    redirect("/signin");
  }
}