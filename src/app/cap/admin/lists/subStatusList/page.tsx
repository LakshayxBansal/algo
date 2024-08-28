'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import SubStatusForm from '@/app/Widgets/masters/masterForms/subStatusForm';
import { getEnquirySubSatusById, getEnquirySubStatus1 } from '@/app/controllers/enquirySubStatus.controller';


export default function subStatus() {
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
];
  
  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
      </AppBar>
      <EntityList
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <SubStatusForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getEnquirySubStatus1}
        fnFetchDataByID={getEnquirySubSatusById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
