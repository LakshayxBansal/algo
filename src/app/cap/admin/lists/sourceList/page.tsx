'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import ExecutiveDeptForm from '@/app/Widgets/masters/masterForms/executiveDeptForm';
import { getDeptById, getExecutiveDepts } from '@/app/controllers/executiveDept.controller';
import SourceForm from '@/app/Widgets/masters/masterForms/sourceForm';
import { getEnquirySource, getEnquirySourceById, getEnquirySources } from '@/app/controllers/enquirySource.controller';


export default function enquirySource() {
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
              <SourceForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getEnquirySources}
        fnFetchDataByID={getEnquirySourceById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
