"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  delStateById,
  getStateById,
  getStateByPage,
} from "@/app/controllers/masters.controller";
import StateFormList from "@/app/Widgets/masters/masterForms/stateFormList";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function State() {
  return (
    <>
      <EntityList
        title="State List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <StateFormList
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getStateByPage}
        fnFetchDataByID={getStateById}
        fnDeleteDataByID={delStateById}
        customCols={columns}
        AddAllowed={true}
        height = "30em"
      ></EntityList>
    </>
  );
}
