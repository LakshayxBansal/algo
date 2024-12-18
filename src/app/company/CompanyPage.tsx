"use client"
import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import CompanyEntityList from "./CompanyEntityList";
import InviteEntityList from "./InviteEntityList";
import { Box, Paper, Typography, Accordion, AccordionSummary, AccordionDetails, Badge } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { getTotalInvite } from "../controllers/user.controller";
import { logger } from "../utils/logger.utils";
import { Metadata } from "next";
import { AddDialog } from "../Widgets/masters/addDialog";
import CreateCompany from "./CreateCompany";
import SecondNavbar from "../cap/navbar/SecondNavbar";

export const metadata: Metadata = {
  title: 'Manage Company'
}

export default function CompanyPage({ totalInvites, totalCompanies }: { totalInvites: number, totalCompanies: number }) {
  const [dialogOpen, setDialogOpen] = React.useState(totalInvites + totalCompanies === 0 ? true : false);

  return (
    <>
      <Box>
        <Box sx={{ margin: "20px 20px" }}>
          <SecondNavbar title={"Company"} />
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
              <Typography variant="h6" sx={{ marginLeft: "-25px" }}>Invite List</Typography>
              <Badge badgeContent={totalInvites} color="primary" sx={{ marginLeft: "8px", marginTop: "5px" }}>
              </Badge>
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "white", width: "100%", padding: "8px 0px 16px" }}>
              <InviteEntityList />
            </AccordionDetails>
          </Accordion>
        </Box>
        {/* <Box>
              <Paper style={{ margin: "20px 20px 5px 20px", padding: "10px" }}>
                <Typography variant="h6">Company List</Typography>
              </Paper>
            </Box> */}
        <Box>
          <CompanyEntityList />
        </Box>
      </Box>
      {dialogOpen && (
        <AddDialog
          title="Add Company"
          open={dialogOpen}
          setDialogOpen={setDialogOpen}
        >
          <CreateCompany
            setDialogOpen={setDialogOpen}
          />
        </AddDialog>
      )}
    </>
  );
}