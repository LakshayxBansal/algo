import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Paper, Typography } from '@mui/material';
import { getEnquiriesOverview } from '@/app/controllers/dashboard.controller';

const pgSize = 5;

export default async function ExecutiveEnquiryList() {
  let data = await getEnquiriesOverview();  

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID' },
    { field: 'name', headerName: 'Executive', width: 200 },
    { field: 'total', headerName: 'Total Open', width: 150 },
    { field: 'since1w', headerName: 'Since 1 week', width: 150 },
    { field: 'since2w', headerName: 'Since 2 week', width: 150 },
    { field: 'since3w', headerName: 'Since 3 week', width: 150 }
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
