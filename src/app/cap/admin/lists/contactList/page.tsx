"use client";
import * as React from "react";

import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import { DeleteContact, getContactById, getContactByPage } from "@/app/controllers/contact.controller";
import AppBar from "@mui/material/AppBar";
import ContactForm from "@/app/Widgets/masters/masterForms/contactForm";

export default function ManageContacts() {
  const columns: GridColDef[] = [
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
        title="Contact List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getContactByPage}
        fnFetchDataByID={getContactById}
        fnDeleteDataByID={DeleteContact}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </div>
  );
}
