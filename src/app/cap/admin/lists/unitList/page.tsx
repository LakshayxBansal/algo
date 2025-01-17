"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import UnitForm from "@/app/Widgets/masters/masterForms/unitForm";
import {
  delUnitById,
  getUnitById,
  getUnitByPage,
} from "@/app/controllers/unit.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { UNIT_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function Unit() {
  return (
    <>
      <SecondNavbar title={"List of Unit"}/>
      <EntityList
        title="Unit"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <UnitForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getUnitByPage}
        fnFetchDataByID={getUnitById}
        fnDeleteDataByID={delUnitById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={UNIT_OBJECT_ID}
      ></EntityList>
    </>
  );
}