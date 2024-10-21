import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import CompanyEntityList from "./CompanyEntityList";
import InviteEntityList from "./InviteEntityList";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default async function Companies() {
  const session = await getSession();
  if (session) {
    return (
      <>
        <Box>
          <Paper style={{margin:"20px 20px", padding:"10px"}}>

          <Typography variant="h6">Company List</Typography>
          </Paper>
          <CompanyEntityList />

          <Box sx={{ height: "10vh", margin: "20px 20px" }}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
              >
                Invite List
              </AccordionSummary>
              <AccordionDetails>
                <InviteEntityList />
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}
