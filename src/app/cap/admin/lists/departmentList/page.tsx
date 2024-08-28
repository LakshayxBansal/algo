'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import DepartmentForm from '@/app/Widgets/masters/masterForms/departmentForm';
import { getDepartmentById, getDepartments } from '@/app/controllers/department.controller';


export default function Department() {
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
              <DepartmentForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getDepartments}
        fnFetchDataByID={getDepartmentById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
