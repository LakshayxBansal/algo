'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import SourceForm from '@/app/Widgets/masters/masterForms/sourceForm';
import { delEnquirySourceById, getEnquirySourceById, getEnquirySourceByPage } from '@/app/controllers/enquirySource.controller';


export default function enquirySource() {
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
        title='Source List'
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <SourceForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getEnquirySourceByPage}
        fnFetchDataByID={getEnquirySourceById}
        fnDeleteDataByID={delEnquirySourceById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
