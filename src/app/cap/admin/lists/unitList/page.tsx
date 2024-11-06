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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function Unit() {
  return (
    <>
      <EntityList
        title="Unit Master"
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
      ></EntityList>
    </>
  );
}