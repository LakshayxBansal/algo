"use client";
import * as React from "react";

import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import AppBar from "@mui/material/AppBar";
import ContactGroupForm from "@/app/Widgets/masters/masterForms/contactGroupForm";
import {
  delContactGroupById,
  getContactGroupById,
  getContactGroupByPage,
} from "@/app/controllers/contactGroup.controller";

export default function ContactGroup() {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "name",
      headerName: "Name",
      width: 150,
      editable: true,
    },
  ];

  return (
    <div style={{ height: 800, width: "100%" }}>
      <AppBar position="static" color="default"></AppBar>
      <EntityList
        title="Contact Group Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ContactGroupForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getContactGroupByPage}
        fnFetchDataByID={getContactGroupById}
        fnDeleteDataByID={delContactGroupById}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </div>
  );
}
