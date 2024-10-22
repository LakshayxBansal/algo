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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
  {
    field: "alias",
    headerName: "Alias",
    editable: true,
  },
];

export default function executiveGroup() {
  return (
    <>
      <EntityList
        title="Executive Group Master"
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
        AddAllowed={true}
        height = "60vh"
      ></EntityList>
    </>
  );
}
