'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import ExecutiveRoleForm from '@/app/Widgets/masters/masterForms/executiveRoleForm';
import { getExecutiveRoleById, getExecutiveRoles } from '@/app/controllers/executiveRole.controller';


export default function executiveRole() {
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
              <ExecutiveRoleForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getExecutiveRoles}
        fnFetchDataByID={getExecutiveRoleById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
