'use client'
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Search, StyledInputBase, SearchIconWrapper } from '@/app/utils/styledComponents';
import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import React, { Dispatch, SetStateAction } from "react";

import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import { Alert } from '@mui/material';
import { getEnquiryCategory } from '@/app/controllers/enquiryCategory.controller';
import CategoryForm from '@/app/Widgets/masters/masterForms/categoryForm';



const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  }
];


export default function ManageCategory(props: {
  id: number;
  setDlgValue: Dispatch<SetStateAction<boolean>>;
}) {

  async function handleDelete() {
    await DeleteCategory(props.id);
    props.setDlgValue(false);
  }

  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Box sx={{ flexGrow: 1, display: 'flex' }}>
            <Button variant="contained">Add New</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <EntityList
        modForm={(setDialogOpen: ((props: any) => void) | undefined, setVal: ((props: any) => void) | undefined,data:any) => (
          <CategoryForm
            setDialogOpen={setDialogOpen}
            setDialogValue={setVal}
            data={data}
          />)}
        DelDialog={(delDialogOpen: any, delDialogClose: any, dialogName: any, id: any) => (
          <Alert variant="filled" severity="info">

            <Button
              onClick={() => {
                props.setDlgValue(false);
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button onClick={handleDelete} color="primary" autoFocus>
              Delete
            </Button>

          </Alert>
        )}
        fetchDataFn={getEnquiryCategory}
        customCols={columns}>
      </EntityList>
    </div>
  );
}
