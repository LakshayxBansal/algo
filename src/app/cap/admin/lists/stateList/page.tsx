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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";

const columns: GridColDef[] = [
  {
    field: "Country_name",
    headerName: "Country",
    editable: true,
  },
  {
    field: "name",
    headerName: "State",
    editable: true,
  },
];

export default function State() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of State"}/>
      </Box>
      <EntityList
        title="State"
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
