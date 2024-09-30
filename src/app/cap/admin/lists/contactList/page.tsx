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
        title="Contact List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fileUploadFeatureReqd={true} 
        fnFileUpad={createContactsBatch} 
        sampleFileName=""
        fetchDataFn={getContactByPage}
        fnFetchDataByID={getContactById}
        fnDeleteDataByID={DeleteContact}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </>
  );
}
