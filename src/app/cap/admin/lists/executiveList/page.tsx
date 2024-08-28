'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import ExecutiveForm from '@/app/Widgets/masters/masterForms/executiveForm';
import { getExecutiveById, getExecutives } from '@/app/controllers/executive.controller';

export default function executive() {
const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'alias',
    headerName: 'Alias',
    width: 150,
    editable: true,
  },
  { 
    field: "email", 
    headerName: "Email", 
    width: 100,
    editable: true,
  },
  { 
    field: "mobile", 
    headerName: "Mobile", 
    width: 100,
    editable: true,
  },
];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
      </AppBar>
      <EntityList
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <ExecutiveForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getExecutives}
        fnFetchDataByID={getExecutiveById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
