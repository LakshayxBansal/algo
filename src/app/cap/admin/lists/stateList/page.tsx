'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import { getStateById, getStateByPage } from '@/app/controllers/masters.controller';
import StateForm from '@/app/Widgets/masters/masterForms/stateForm';


export default function State() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
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
              <StateForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getStateByPage}
        fnFetchDataByID={getStateById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}