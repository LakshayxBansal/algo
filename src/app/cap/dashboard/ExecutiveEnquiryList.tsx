import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
import { getExecutiveEnquiriesOverview } from '@/app/controllers/dashboard.controller';

const pgSize = 5;

export default async function ExecutiveEnquiryList() {
  const data = await getExecutiveEnquiriesOverview();  

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Executive', width: 200 },
    { field: 'currDay', headerName: 'Open', width: 150 },
    { field: 'since1w', headerName: 'Since 1 week', width: 150, description: 'Number of open enquiries since 1 week' },
    { field: 'since2w', headerName: 'Since 2 week', width: 150, description: 'Number of open enquiries since 2 week' },
    { field: 'since3w', headerName: 'Since 3 week', width: 150, description: 'Number of open enquiries since 3 week' }
  ];


  return (
    <>
      <Paper elevation={2} sx={{ p: 2, borderRadius: "16px", }}>
        <Typography component="h2" variant="h6" color="primary" gutterBottom>Enquiries</Typography>
        <DataGrid
          rows={data}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[pgSize, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>
    </>
  );
}
