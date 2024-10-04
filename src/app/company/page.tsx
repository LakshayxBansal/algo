import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import CompanyEntityList from "./CompanyEntityList";
import InviteEntityList from "./InviteEntityList";
import { Box } from "@mui/material";

export default async function Companies() {
  const session = await getSession();
  if (session) {
    return (
      <>
        <Box>
          <CompanyEntityList />
        </Box>
        <Box sx={{ mt: 12 }}>
          <InviteEntityList />
        </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}