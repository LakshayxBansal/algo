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
import { headers } from "next/headers";

export default async function Companies() {
  try {
    const session = await getSession();
    const totalInvites = await getTotalInvite();

    // const headersList = headers();
    // const ip = headersList.get("x-forwarded-for") || headersList.get("host");
    // console.log('ip ', ip);
    // console.log('ip address ', headersList.get('x-real-ip'),
    // headersList.get('x-forwarded-for')?.split(',')[0] ,
    // headersList.get('cf-connecting-ip'));
    
    

    // const geoResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    // const geoData = await geoResponse.json();

    // const country = geoData.country_name || "Unknown";

    
    // API route
    // const response = await fetch('http://localhost:3000/api/geolocation', {
    //   cache: 'no-store' // or use revalidate if you want to cache
    // })
    // const locationData = await response.json()
    // console.log('result', locationData);
    
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