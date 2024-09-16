'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import ExecutiveDeptForm from '@/app/Widgets/masters/masterForms/executiveDeptForm';
import { delExecutiveDeptById, getDeptById, getExecutiveDeptByPage } from '@/app/controllers/executiveDept.controller';


export default function executiveDept() {
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
      title='Executive Dept List'
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <ExecutiveDeptForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getExecutiveDeptByPage}
        fnFetchDataByID={getDeptById}
        fnDeleteDataByID={delExecutiveDeptById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
