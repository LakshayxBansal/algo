"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ExecutiveForm from "@/app/Widgets/masters/masterForms/executiveForm";
import {
  delExecutiveById,
  getExecutiveById,
  getExecutiveByPage,
  getExecutiveColumns,
} from "@/app/controllers/executive.controller";
import { getScreenDescription } from "@/app/controllers/object.controller";

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
  {
    field: "email",
    headerName: "Email",
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    editable: true,
  },
];


export default function executive() {

  return (
    <>
      <EntityList
        title="Executive List Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ExecutiveForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getExecutiveByPage}
        fnFetchDataByID={getExecutiveById}
        fnDeleteDataByID={delExecutiveById}
        fnFetchColumns={getExecutiveColumns}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
