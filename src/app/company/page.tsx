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
  Badge,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import { getTotalInvite } from "../controllers/user.controller";
import { logger } from "../utils/logger.utils";
import SnackModal from "../utils/SnackModalUtils";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Manage Company'
}

export default async function Companies() {
  try {
    const session = await getSession();
    const totalInvites = await getTotalInvite();

    if (session) {
      return (
        <>
          <Box>
            <Box sx={{ margin: "20px 20px" }}>
              <Accordion sx={{ padding: "0px 0px 0px" }}>
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
                  <Badge badgeContent={1} color="error" sx={{float:"right"}}>
                  <Typography variant="h6">
                    {/* Total Invites : {totalInvites.rowCount} */}
                    Invite List
                  </Typography>
                  </Badge>

                </AccordionSummary>
                <AccordionDetails sx={{ bgcolor: "white", width: "100%", padding: "8px 0px 16px" }}>
                  <InviteEntityList />
                </AccordionDetails>
              </Accordion>
            </Box>
            <Box>
              <Paper style={{ margin: "20px 20px 5px 20px", padding: "10px" }}>
                <Typography variant="h6">Company List</Typography>
              </Paper>
            </Box>
            <Box>
              <CompanyEntityList />
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