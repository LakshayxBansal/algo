"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ExecutiveRoleForm from "@/app/Widgets/masters/masterForms/executiveRoleForm";
import {
  delExecutiveRoleById,
  getExecutiveRoleById,
  getExecutiveRoleByPage,
} from "@/app/controllers/executiveRole.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { EXECUTIVE_ROLE_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
  {
    field: "level",
    headerName: "Level",
    editable: true,
  },
];

export default function executiveRole() {
  return (
    <>
      <SecondNavbar title={"List of Executive Roles"}/>
      <EntityList
        title="Executive Role"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ExecutiveRoleForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getExecutiveRoleByPage}
        fnFetchDataByID={getExecutiveRoleById}
        fnDeleteDataByID={delExecutiveRoleById}
        customCols={columns}
        uploadAllowed={false}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={EXECUTIVE_ROLE_OBJECT_ID}
      ></EntityList>
    </>
  );
}
