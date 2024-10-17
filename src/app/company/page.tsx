import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import CompanyEntityList from "./CompanyEntityList";
import InviteEntityList from "./InviteEntityList";
import { Box, Paper, Typography,Accordion,AccordionSummary,AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export default async function Companies() {
  const session = await getSession();
  if (session) {
    return (
      <>
        <Box >
          <Typography variant="h6" marginLeft="2%" marginTop="1rem">
            Company List
          </Typography>
          <Box sx={{marginTop: "1rem"}}>
          <CompanyEntityList />
          </Box>
          <Accordion>
            <AccordionSummary
              sx={{ bgcolor: "white", width: "97%", margin: "auto", marginTop: "1rem" }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography variant="h6">
            Invite from Companies
          </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "white" }}>
              <InviteEntityList/>
            </AccordionDetails>
          </Accordion>
        </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}
