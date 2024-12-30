'use client';

import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

const Loading = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f9f9f9"
      padding={2}
    >
      <Box width="100%" maxWidth="400px" mb={2}>
        <LinearProgress />
      </Box>
      <Typography variant="h6" color="textSecondary">
        Loading, please wait...
      </Typography>
    </Box>
  );
};

export default Loading;
