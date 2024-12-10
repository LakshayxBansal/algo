import * as React from "react";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { redirect } from "next/navigation";
import InviteList from "./InviteList";
import UserList from "./UserList";
import { getSession } from "../../../services/session.service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'Manage User'
}

export default async function AddUser() {
  const session = await getSession();
  if (session) {
    return (
      <Box>
        <Box sx={{margin:"20px 20px" }}>
          <Accordion sx={{ padding: "0px 0px 0px" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              Invited User
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "white", width: "100%", padding: "8px 0px 16px" }}>
              <InviteList companyId={session.user.dbInfo.id} />
            </AccordionDetails>
          </Accordion>
        </Box>
        <UserList />
      </Box>
    );
  } else {
    redirect("/signin");
  }
  redirect("/signin");
}
