'use client'
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import AppBar from '@mui/material/AppBar';
import CategoryForm from '@/app/Widgets/masters/masterForms/categoryForm';
import { delCategoryById, getCategoryById, getEnquiryCategoryByPage } from '@/app/controllers/enquiryCategory.controller';


export default function Category() {
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
      title='Enquiry Category Master'
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
              <CategoryForm
              setDialogOpen={fnDialogOpen}
              setDialogValue={fnDialogValue}
              data={data}
            />
          )}
        fetchDataFn={getEnquiryCategoryByPage}
        fnFetchDataByID={getCategoryById}
        fnDeleteDataByID={delCategoryById}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
