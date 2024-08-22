'use client'
<<<<<<< HEAD
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Search, StyledInputBase, SearchIconWrapper } from '@/app/utils/styledComponents';
import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import { DeleteContact, getContact } from '@/app/controllers/contact.controller';
import React, { Dispatch, SetStateAction } from "react";

import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';
import { Alert } from '@mui/material';
=======
import * as React from 'react';

import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import {getContact, getContactById} from '@/app/controllers/contact.controller';
import AppBar from '@mui/material/AppBar';
>>>>>>> origin/branch-1

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'alias',
    headerName: 'Alias',
    width: 150,
    editable: true,
  },
  {
    field:'email',
    headerName: 'Email',
    width: 180,
    editable: true,
  },
  {
    field: 'mobile',
    headerName: 'Phone Number',
    width: 150,
    editable: true,
  },
  {
    field: 'pan',
    headerName: 'Pan',
    width: 150,
    editable: true,
  }
];


export default function ManageContacts(props: {
  id: number;
  setDlgValue: Dispatch<SetStateAction<boolean>>;
}) {

  async function handleDelete() {
    await DeleteContact(props.id);
    props.setDlgValue(false);
  }

  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
        {/* <Toolbar
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
        </Toolbar> */}
      </AppBar>
<<<<<<< HEAD
      <EntityList
        modForm={(setDialogOpen: ((props: any) => void) | undefined, setVal: ((props: any) => void) | undefined,data:any) => (
          <ContactForm
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
        fetchDataFn={getContact}
        customCols={columns}>
=======
      <EntityList 
        fetchDataFn={getContact}
        fnFetchDataByID={getContactById}
        customCols={columns}
        AddAllowed={true}>
>>>>>>> origin/branch-1
      </EntityList>
    </div>
  );
}
