"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import AreaForm from "@/app/Widgets/masters/masterForms/areaForm";
import {
  delAreaById,
  getAreaByPage,
  getById,
} from "@/app/controllers/area.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { AREA_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function Area() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Area"}/>
      </Box>
      <EntityList
        title="Area"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <AreaForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getAreaByPage}
        fnFetchDataByID={getById}
        fnDeleteDataByID={delAreaById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={AREA_OBJECT_ID}
      ></EntityList>
    </>
  );
}
