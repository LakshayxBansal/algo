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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { EXECUTIVE_OBJECT_ID } from "@/app/utils/consts.utils";

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
      <SecondNavbar title={"List of Executives"}/>
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
        // fnFetchColumns={getExecutiveColumns}
        fnFetchColumns={11}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
        objectTypeId={EXECUTIVE_OBJECT_ID}
      ></EntityList>
    </>
  );
}