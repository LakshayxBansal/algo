<<<<<<< HEAD
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
=======
"use client";
import * as React from "react";
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df

import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import { getContactById, getContactByPage } from "@/app/controllers/contact.controller";
import AppBar from "@mui/material/AppBar";
import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";

export default function ManageContacts() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email",
      width: 150,
      editable: true,
    },
    {
      field: "whatsapp",
      headerName: "Whatsapp",
      type: "number",
      width: 110,
      editable: true,
    },
  ];

  return (
    <div style={{ height: 800, width: "100%" }}>
      <AppBar position="static" color="default"></AppBar>
      <EntityList
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getContactByPage}
        fnFetchDataByID={getContactById}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </div>
  );
}
