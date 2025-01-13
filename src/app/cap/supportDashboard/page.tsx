import * as React from "react";
import Box from "@mui/material/Box";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { Grid } from "@mui/material";
import AverageAgeCard from "./AverageAgeCard";
import ClosedCard from "./ClosedCard";
import OpenCard from "./OpenCard";
import UnassignedCard from "./UnassignedCard";
import OverviewCard from "./OverviewCard";
import { logger } from "@/app/utils/logger.utils";
import { Metadata } from "next";
import TicketList from "./TicketList";
import ExecutiveTicketList from "./ExecutiveTicketList";

// export const metadata : Metadata = {
//   title : 'Dashboard'
// }


export default async function SupportDashboard() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
        return (
          <Box sx={{ maxWidth: "100%", bgcolor: "#F9FAFB" }}>
            <Box sx={{ py: 3, maxWidth: "90vw", margin: "auto" }}>
              <Grid container spacing={3}>
                <Grid item xs={11} sm={6} md={3} sx={{ margin: "auto" }}>
                  <div>
                    {" "}
                    <OpenCard />{" "}
                  </div>
                </Grid>
                <Grid item xs={11} sm={6} md={3} sx={{ margin: "auto" }}>
                  <div>
                    {" "}
                    <UnassignedCard />{" "}
                  </div>
                </Grid>
                <Grid item xs={11} sm={6} md={3} sx={{ margin: "auto" }}>
                  <div>
                    {" "}
                    <ClosedCard />{" "}
                  </div>
                </Grid>
                <Grid item xs={11} sm={6} md={3} sx={{ margin: "auto" }}>
                  <div>
                    {" "}
                    <AverageAgeCard />{" "}
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ pt: 4 }}>
                <Grid item xs={11} sm={12} md={6} sx={{ margin: "auto" }}>
                  <div>
                    <OverviewCard />
                  </div>
                </Grid>
                <Grid item xs={11} sm={12} md={6} sx={{ margin: "auto" }}>
                  <div>
                    <TicketList />
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={3} sx={{ mt: 4 }}>
                <Grid item xs={11} sm={12} md={12} sx={{ margin: "auto" }}>
                  <div>
                    <ExecutiveTicketList />
                  </div>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
    }
  } catch (error) {
    logger.error(error);
  }
  redirect("/signin");
}
