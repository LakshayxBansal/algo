import * as React from "react";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Box, Paper } from "@mui/material";
import { getClosedTicketsCount } from "@/app/controllers/dashboard.controller";
import { logger } from "@/app/utils/logger.utils";

export default async function ClosedCard() {
  let result, sinceDate;
  try {
    result = await getClosedTicketsCount();
    sinceDate = new Date(result.since).toDateString();
  } catch (e) {
    logger.info(e);
  }
  return (
    <Paper
      sx={{
        p: "24px",
        height: 220,
        borderRadius: "16px",
        background:
          "linear-gradient(135deg, rgba(255, 245, 204, 0.48), rgba(255, 214, 102, 0.48))",
        color: "#7A4100",
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
            Closed Tickets
          </Typography>
          <Typography component="p" variant="h4">
            {result?.count}
          </Typography>
          <Typography color="text.secondary" sx={{ flex: 1 }}>
            since {sinceDate}
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
