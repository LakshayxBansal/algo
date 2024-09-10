'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import AllocationTypeMasterForm from '@/app/Widgets/masters/masterForms/allocationTypeMaster';
import { getAllocationTypeById, getAllocationTypeByPage } from '@/app/controllers/allocationType.controller';


export default function AllocationType() {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    }
  ];
  
  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
      </AppBar>
      <EntityList
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <AllocationTypeMasterForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getAllocationTypeByPage}
        fnFetchDataByID={getAllocationTypeById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}