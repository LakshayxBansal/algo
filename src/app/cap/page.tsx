import React, { Suspense } from "react";
import Dashbaord  from './dashboard/page';
import { Box, Grid, Card, CardContent, Typography, Skeleton } from "@mui/material";

import CapLayout from './layout';
import { usePathname } from "next/navigation";


export default function ClientApp() {

  return (
    <Suspense fallback={<div>Loading...</div>}>
    <Dashbaord></Dashbaord>
    </Suspense>
  );
};


const DashboardSkeleton: React.FC = () => {
  return (
    <Box padding={2}>
      {/* Top Stats Cards */}
      <Grid container spacing={2}>
        {Array.from({ length: 4 }).map((_, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="70%" height={30} />
                <Skeleton variant="text" width="50%" height={20} />
                <Skeleton variant="rectangular" width="100%" height={40} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} marginTop={2}>
        {/* Enquiries Overview */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <Skeleton width="50%" />
              </Typography>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Enquiries Table */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                <Skeleton width="50%" />
              </Typography>
              <Skeleton variant="rectangular" width="100%" height={200} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};




