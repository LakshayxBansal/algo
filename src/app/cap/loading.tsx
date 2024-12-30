import React from 'react';
import { Skeleton, Box, Paper } from '@mui/material';

const TableSkeleton: React.FC = () => {
  return (
    <Box sx={{ padding: 2 }}>
      {/* Search Bar and Button Skeleton */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="rectangular" width="30%" height={36} />
        <Skeleton variant="rectangular" width={80} height={36} />
      </Box>

      {/* Table Skeleton */}
      <Paper elevation={1} sx={{ overflow: 'hidden' }}>
        {/* Table Header Skeleton */}
        <Box
          sx={{
            display: 'flex',
            height: 40, // Reduced height
            bgcolor: 'grey.200',
            alignItems: 'center',
            paddingX: 1,
          }}
        >
          {[...Array(8)].map((_, index) => (
            <Box key={index} sx={{ flex: 1, textAlign: 'center' }}>
              <Skeleton variant="text" height={16} width="70%" />
            </Box>
          ))}
        </Box>

        {/* Table Rows Skeleton */}
        {[...Array(10)].map((_, rowIndex) => (
          <Box
            key={rowIndex}
            sx={{
              display: 'flex',
              height: 36, // Reduced height
              alignItems: 'center',
              paddingX: 1,
              borderBottom: rowIndex < 9 ? '1px solid #e0e0e0' : 'none',
            }}
          >
            {[...Array(8)].map((_, colIndex) => (
              <Box key={colIndex} sx={{ flex: 1, textAlign: 'center' }}>
                <Skeleton variant="rectangular" height={20} width="70%" />
              </Box>
            ))}
          </Box>
        ))}
      </Paper>

      {/* Pagination Skeleton */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Skeleton variant="rectangular" width="15%" height={36} />
        <Skeleton variant="rectangular" width="15%" height={36} />
      </Box>
    </Box>
  );
};

export default TableSkeleton;
