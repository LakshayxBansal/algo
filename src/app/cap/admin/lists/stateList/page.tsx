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
    field: "Country_name",
    headerName: "Country",
    editable: false,
  },
  {
    field: "name",
    headerName: "State",
    editable: false,
  },
];

export default function State() {
  return (
    <>
      <EntityList
        title="State Master"
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
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
