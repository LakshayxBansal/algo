'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import CurrencyForm from '@/app/Widgets/masters/masterForms/currencyForm';
import { getCurrencyById, getCurrencyByPage } from '@/app/controllers/currency.controller';


export default function Currency() {
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      editable: true,
    },
    {
     field: 'symbol',
     headerName: 'Symbol',
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
              <CurrencyForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getCurrencyByPage}
        fnFetchDataByID={getCurrencyById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}