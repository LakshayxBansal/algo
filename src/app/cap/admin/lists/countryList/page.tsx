'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import CountryForm from '@/app/Widgets/masters/masterForms/countryForm';
import { getCountryById, getCountryByPage,delCountryById } from '@/app/controllers/masters.controller';


export default function Country() {
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
        title = "Country List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <CountryForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getCountryByPage}
        fnFetchDataByID={getCountryById}
        fnDeleteDataByID={delCountryById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}