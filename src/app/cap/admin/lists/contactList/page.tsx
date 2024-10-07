// "use client";
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

async function Batch() {
  "use server";
  return await createContactsBatch;
}
async function Batch1() {
  "use server";
  return await getContactByPage;
}
async function Batch2() {
  "use server";
  return await getContactById;
}
export default function ManageContacts() {
  return (
    <>
      <EntityList
        title="Contact List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fileUploadFeatureReqd={true}
        sampleFileName=""
        fnFileUpad={Batch}
        fetchDataFn={Batch1}
        fnFetchDataByID={Batch2}
        fnDeleteDataByID={DeleteContact}
        customCols={columns}
        AddAllowed={true}
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
