'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import SubStatusForm from '@/app/Widgets/masters/masterForms/subStatusForm';
import { delSubStatusById, getEnquirySubSatusById, getEnquirySubStatusByPage } from '@/app/controllers/enquirySubStatus.controller';


export default function subStatus() {
const columns: GridColDef[] = [
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
        title='Sub Status List'
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <SubStatusForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getEnquirySubStatusByPage}
        fnFetchDataByID={getEnquirySubSatusById}
        fnDeleteDataByID={delSubStatusById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
