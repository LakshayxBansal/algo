import * as React from "react";
import { getSession } from "../services/session.service";
import { redirect } from "next/navigation";
import CompanyEntityList from "./CompanyEntityList";
import InviteEntityList from "./InviteEntityList";
import { Box, Paper, Typography } from "@mui/material";

export default async function Companies() {
  const session = await getSession();
  if (session) {
    return (
      <>
        <Box >
          {/* <Box sx={{ height: "40vh", overflow: "scroll" }}> */}
          <Typography variant="h6">
          Company List
          </Typography>
            <CompanyEntityList />
          {/* </Box> */}
          {/* <Box sx={{ height: "40vh", overflow: "scroll" }}> */}
          <Typography variant="h6">
          Invite List
          </Typography>
            <InviteEntityList />
          {/* </Box> */}
        </Box>
      </>
    );
  } else {
    redirect("/signin");
  }
}
