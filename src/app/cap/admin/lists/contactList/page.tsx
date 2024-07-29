'use client'
import * as React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Search, StyledInputBase, SearchIconWrapper } from '@/app/utils/styledComponents';
import { GridColDef } from '@mui/x-data-grid';
import EntityList from '@/app/Widgets/masters/EntityList';
import {getContact} from '@/app/controllers/contact.controller';

import SearchIcon from '@mui/icons-material/Search';
import AppBar from '@mui/material/AppBar';
import { AddDialog } from '@/app/Widgets/masters/addDialog';
import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'firstName',
    headerName: 'First name',
    width: 150,
    editable: true,
  },
  {
    field: 'lastName',
    headerName: 'Last name',
    width: 150,
    editable: true,
  },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 110,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
];


export default function ManageContacts() {


  return (
    <div style={{ height: 800, width: '100%' }}>
      <AppBar position="static" color="default">
        <Toolbar
          sx={{
            pr: '24px', // keep right padding when drawer closed
          }}>
          <Box sx={{flexGrow: 1, display: 'flex' }}>
            <Search>
              <SearchIconWrapper>
                <SearchIcon/>
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
          </Box>
          <Box sx={{flexGrow: 1, display: 'flex' }}>
            <Button variant="contained">Add New</Button>
          </Box>
        </Toolbar>
      </AppBar>
      <EntityList 
        ModForm={(id) => 
          <ContactForm
            id={id}
          />}
        fetchDataFn={getContact}
        customCols={columns}
        AddAllowed={true}>
      </EntityList>
    </div>
  );
}
