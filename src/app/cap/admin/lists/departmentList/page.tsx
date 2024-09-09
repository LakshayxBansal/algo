'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import DepartmentForm from '@/app/Widgets/masters/masterForms/departmentForm';
import { delDepartmentById, getDepartmentById, getDepartmentByPage } from '@/app/controllers/department.controller';
import DeleteForm from '../../../../Widgets/masters/masterForms/deleteForm';

export default function Department() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
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
        renderDelForm={(fnDialogOpen, fnDialogValue, data)=>(
          <DeleteForm 
          setDialogOpen={fnDialogOpen}
          setDialogValue={fnDialogValue}
          data={data}/>
        )}
        fetchDataFn={getDepartmentByPage}
        fnFetchDataByID={getDepartmentById}
        fnDeleteDataByID={delDepartmentById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
