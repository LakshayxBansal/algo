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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { CONTACT_GROUP_OBJECT_ID } from "@/app/utils/consts.utils";

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
      <SecondNavbar title={"List of Contact Groups"}/>
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
        objectTypeId={CONTACT_GROUP_OBJECT_ID}
      ></EntityList>
    </>
  );
}
