'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import ExecutiveGroupForm from '@/app/Widgets/masters/masterForms/executiveGroupForm';
import { getExecutiveGroupById, getExecutiveGroups } from '@/app/controllers/executiveGroup.controller';

export default function executiveGroup() {
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
  }
];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
      </AppBar>
      <EntityList
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <ExecutiveGroupForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getExecutiveGroups}
        fnFetchDataByID={getExecutiveGroupById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
