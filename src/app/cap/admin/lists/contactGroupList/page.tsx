"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ContactGroupForm from "@/app/Widgets/masters/masterForms/contactGroupForm";
import {
  delContactGroupById,
  getContactGroupById,
  getContactGroupByPage,
} from "@/app/controllers/contactGroup.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function ContactGroup() {
  return (
    <>
      <EntityList
        title="Contact Group"
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
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
