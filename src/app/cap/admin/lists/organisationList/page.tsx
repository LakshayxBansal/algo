'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import { delOrganisationById, getOrganisationById, getOrganisationByPage } from '@/app/controllers/organisation.controller';
import OrganisationForm from '@/app/Widgets/masters/masterForms/organisationForm';


export default function organisation() {
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'alias',
    headerName: 'Alias',
    width: 150,
    editable: true,
  }
];
  
  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
      </AppBar>
      <EntityList
        title='Organisation List'
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <OrganisationForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getOrganisationByPage}
        fnFetchDataByID={getOrganisationById}
        fnDeleteDataByID={delOrganisationById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
