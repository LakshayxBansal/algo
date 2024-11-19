"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import ExecutiveDeptForm from "@/app/Widgets/masters/masterForms/executiveDeptForm";
import {
  delExecutiveDeptById,
  getDeptById,
  getExecutiveDeptByPage,
} from "@/app/controllers/executiveDept.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function executiveDept() {
  return (
    <>
      <EntityList
        title="Executive Dept Master"
        renderForm={(fnDialogOpen, fnDialogValue, masterData, data) => (
          <ExecutiveDeptForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            masterData={masterData}
            data={data}
          />
        )}
        fetchDataFn={getExecutiveDeptByPage}
        fnFetchDataByID={getDeptById}
        fnDeleteDataByID={delExecutiveDeptById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
