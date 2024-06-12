'use client'
import * as React from 'react';
import { useDemoData } from '@mui/x-data-grid-generator';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Search, StyledInputBase, StripedDataGrid, SearchIconWrapper } from '@/app/utils/styledComponents'

import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';

export default function StripedGrid() {
  const { data, loading } = useDemoData({
    dataSet: 'Employee',
    rowLength: 200,
  });

  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}>
          <Box sx={{flexGrow: 1, display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Box sx={{flexGrow: 1, display: 'flex' }}>
            <Button variant="contained">Add New</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <StripedDataGrid
        loading={loading}
        {...data}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
        }
      />
    </div>
  );
}


