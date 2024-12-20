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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
  {
    field: "alias",
    headerName: "Alias",
    editable: false,
  },
  {
    field: "email",
    headerName: "Email",
    editable: false,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    editable: false,
  },
];


export default function executive() {
  return (
    <>
      <EntityList
        title="Executive"
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <ExecutiveForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
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
        height="60vh"
      ></EntityList>
    </>
  );
}