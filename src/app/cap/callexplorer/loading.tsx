import React from 'react';
import { Skeleton, Box, Grid, Paper } from '@mui/material';

const SkeletonLoader: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Header Skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="rectangular" width={100} height={30} />
        <Skeleton variant="rectangular" width={100} height={30} />
      </Box>

      {/* Table Skeleton */}
      <Paper elevation={1} sx={{ padding: 2 }}>
        <Grid container spacing={2}>
          {/* Table Header */}
          <Grid item xs={12}>
            <Skeleton variant="rectangular" height={40} />
          </Grid>
          {/* Table Rows */}
          {[...Array(10)].map((_, index) => (
            <Grid key={index} item xs={12}>
              <Skeleton variant="rectangular" height={30} />
            </Grid>
          ))}
        </Grid>
      </Paper>

      {/* Footer Buttons Skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Skeleton variant="rectangular" width={120} height={40} />
        <Skeleton variant="rectangular" width={120} height={40} />
      </Box>
    </Box>
  );
};

export default SkeletonLoader;
