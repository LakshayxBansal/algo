"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ExecutiveGroupForm from "@/app/Widgets/masters/masterForms/executiveGroupForm";
import {
  delExecutiveGroupById,
  getExecutiveGroupById,
  getExecutiveGroupByPage,
} from "@/app/controllers/executiveGroup.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { EXECUTIVE_GROUP_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
  {
    field: "alias",
    headerName: "Alias",
    editable: false,
  },
];

export default function executiveGroup() {
  return (
    <>
      <SecondNavbar title={"List of Executive Groups"}/>
      <EntityList
        title="Executive Group"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ExecutiveGroupForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getExecutiveGroupByPage}
        fnFetchDataByID={getExecutiveGroupById}
        fnDeleteDataByID={delExecutiveGroupById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={EXECUTIVE_GROUP_OBJECT_ID}
      ></EntityList>
    </>
  );
}
