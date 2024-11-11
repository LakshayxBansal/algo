// <<<<<<< HEAD
// 'use client'
// import * as React from 'react';
// import Toolbar from '@mui/material/Toolbar';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { Search, StyledInputBase, SearchIconWrapper } from '@/app/utils/styledComponents';
// import { GridColDef } from '@mui/x-data-grid';
// import EntityList from '@/app/Widgets/masters/EntityList';
// import {getContact} from '@/app/controllers/contact.controller';

// import SearchIcon from '@mui/icons-material/Search';
// import AppBar from '@mui/material/AppBar';
// import { AddDialog } from '@/app/Widgets/masters/addDialog';
// import ContactForm from '@/app/Widgets/masters/masterForms/contactForm';

// const columns: GridColDef[] = [
//   { field: 'id', headerName: 'ID', width: 90 },
//   {
//     field: 'firstName',
//     headerName: 'First name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'lastName',
//     headerName: 'Last name',
//     width: 150,
//     editable: true,
//   },
//   {
//     field: 'age',
//     headerName: 'Age',
//     type: 'number',
//     width: 110,
//     editable: true,
//   },
//   {
//     field: 'fullName',
//     headerName: 'Full name',
//     description: 'This column has a value getter and is not sortable.',
//     sortable: false,
//     width: 160,
//     valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
//   },
// ];
// =======
"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  createContactsBatch,
  DeleteContact,
  getContactById,
  getContactByPage,
} from "@/app/controllers/contact.controller";
import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    editable: true,
  },
  {
    field: "whatsapp",
    headerName: "Whatsapp",
    type: "number",
    editable: true,
  },
];

export default function ManageContacts() {
  return (
    <>
      <EntityList
        title="Contact Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fileUploadFeatureReqd={true}
        sampleFileName=""
        fnFileUpad={createContactsBatch}
        fetchDataFn={getContactByPage}
        // instead of this fn we are sending rows
        fnFetchDataByID={getContactById}
        fnDeleteDataByID={DeleteContact}
        customCols={columns}
        uploadAllowed={true}
        height="60vh"
      ></EntityList>
    </>
  );
}

// import React from "react";
// import { GridColDef } from "@mui/x-data-grid";
// import EntityList from "@/app/Widgets/masters/EntityList";
// import {
//   createContactsBatch,
//   DeleteContact,
//   getContactById,
//   getContactByPage,
// } from "@/app/controllers/contact.controller";
// import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";

// const columns: GridColDef[] = [
//   {
//     field: "name",
//     headerName: "Name",
//     editable: true,
//   },
//   {
//     field: "email",
//     headerName: "Email",
//     editable: true,
//   },
//   {
//     field: "whatsapp",
//     headerName: "Whatsapp",
//     type: "number",
//     editable: true,
//   },
// ];

// async function fetchData() {
//   const data = await getContactByPage;
//   return data;
// }

// export default async function ManageContacts() {
//   const initialData = await fetchData();
//   return (
//     <EntityList
//       title="Contact List"
//       renderForm={(fnDialogOpen, fnDialogValue, data) => (
//         <ContactForm
//           setDialogOpen={fnDialogOpen}
//           setDialogValue={fnDialogValue}
//           data={data}
//         />
//       )}
//       fileUploadFeatureReqd={true}
//       sampleFileName=""
//       fnFileUpad={async (file: any) => {
//         await createContactsBatch(file);
//       }}
//       fetchDataFn={async () => {
//         return await getContactByPage;
//       }}
//       fnFetchDataByID={async () => {
//         return await getContactById;
//       }}
//       fnDeleteDataByID={async () => {
//         await DeleteContact;
//       }}
//       customCols={columns}
//       AddAllowed={true}
//     />
//   );
// }
