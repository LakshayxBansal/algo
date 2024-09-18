'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import { delItemById, getItemById, getItemByPage } from '@/app/controllers/item.controller';
import ItemForm from '@/app/Widgets/masters/masterForms/itemForm';


export default function Items() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "S.No." },
    { field: "name", headerName: "Name", width: 100 },
    { field: "group_id", headerName: "Group Id", width: 100 },
    { field: "alias", headerName: "Alias", width: 100 },
    { field: "unit_id", headerName: "Unit Id", width: 100 },
    { field: "hsn_code", headerName: "Hsn Code", width: 100 },
  ];

  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
      </AppBar>
      <EntityList
        title="Item Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ItemForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getItemByPage}
        fnFetchDataByID={getItemById}
        fnDeleteDataByID={delItemById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}