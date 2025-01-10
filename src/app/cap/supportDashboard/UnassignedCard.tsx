import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { getUnassignedTickets } from "@/app/controllers/dashboard.controller";
import { logger } from "@/app/utils/logger.utils";

export default async function UnassignedCard() {
  let result, unassignedTicketsCount;
  try {
    result = await getUnassignedTickets();
    unassignedTicketsCount = result.count;
  } catch (e) {
    logger.info(e);
  }
  const date = new Date();
  return (
    <Paper
      sx={{
        p: "24px",
        height: 220,
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, rgba(239, 214, 255, 0.48), rgba(198, 132, 255, 0.48))",
        color: "#27097A",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Box>
          <Typography component="h2" variant="h6" gutterBottom>
            Unassigned Tickets
          </Typography>
          <Typography component="p" variant="h4">
            {unassignedTicketsCount}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            on {date.toDateString()}
          </Typography>
        </Box>
        <Box>
          <Link color="primary" href="#">
            View details
          </Link>
        </Box>
      </Box>
    </Paper>
  );
}
