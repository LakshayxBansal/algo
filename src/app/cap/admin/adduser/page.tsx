import * as React from 'react';
import { Box, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { redirect } from 'next/navigation';
import InviteList from './InviteList';
import UserList from './UserList';
import { getSession } from '../../../services/session.service';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default async function AddUser() {
  const session = await getSession();
  if (session) {
    return (
      <>
        <Box >
          <UserList />
          <Accordion>
            <AccordionSummary
              sx={{ bgcolor: "white", width: "97%", margin: "auto", marginTop: "1rem" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h6">
              Invited User
          </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "white" }}>
              <InviteList companyId={session.user.dbInfo.id} />
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}