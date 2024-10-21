import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import CompanyEntityList from "./CompanyEntityList";
import InviteEntityList from "./InviteEntityList";
import {
  Box,
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTotalInvite } from "../controllers/user.controller";
import { logger } from "../utils/logger.utils";
import SnackModal from "../utils/SnackModalUtils";

export default async function Companies() {
  try {
    const session = await getSession();
    const totalInvites = await getTotalInvite();
    if (session) {
      return (
        <>
          <Box>
            <Box>
              <Paper style={{ margin: "20px 20px", padding: "10px" }}>
                <Typography variant="h6">Company List</Typography>
              </Paper>
            </Box>
            <Box>
              <CompanyEntityList />
            </Box>
            <Box sx={{ height: "10vh", margin: "20px 20px" }}>
              <Accordion>
                <AccordionSummary
                  sx={{
                    bgcolor: "white",
                    width: "97%",
                    margin: "auto",
                    marginTop: "1rem",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography variant="h6">
                    Total Invites : {totalInvites.rowCount}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "white" }}>
                  <InviteEntityList />
                </AccordionDetails>
              </Accordion>
            </Box>
          </Box>
        </>
      );
    }
  } catch (error) {
    logger.error(error);
  }
  redirect("/signin");
}
