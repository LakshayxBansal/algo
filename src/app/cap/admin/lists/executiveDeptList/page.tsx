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
        title="Executive Dept List"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ExecutiveDeptForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getExecutiveDeptByPage}
        fnFetchDataByID={getDeptById}
        fnDeleteDataByID={delExecutiveDeptById}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </>
  );
}
