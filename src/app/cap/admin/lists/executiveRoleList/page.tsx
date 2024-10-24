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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function executiveRole() {
  return (
    <>
      <EntityList
        title="Executive Role Master"
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
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
