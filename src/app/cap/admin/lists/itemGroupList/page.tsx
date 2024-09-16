'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import ItemGroupForm from '@/app/Widgets/masters/masterForms/itemGroupForm';
import { delItemGroupById, getItemGroupById, getItemGroupByPage } from '@/app/controllers/itemGroup.controller';


export default function ItemGroup() {
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
        title="Item Group Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ItemGroupForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getItemGroupByPage}
        fnFetchDataByID={getItemGroupById}
        fnDeleteDataByID={delItemGroupById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}