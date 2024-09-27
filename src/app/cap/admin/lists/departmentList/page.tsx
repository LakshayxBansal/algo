"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import DepartmentForm from "@/app/Widgets/masters/masterForms/departmentForm";
import {
  delDepartmentById,
  getDepartmentById,
  getDepartmentByPage,
} from "@/app/controllers/department.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function Department() {
  return (
    <>
      <EntityList
        title="Department Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <DepartmentForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getDepartmentByPage}
        fnFetchDataByID={getDepartmentById}
        fnDeleteDataByID={delDepartmentById}
        customCols={columns}
        AddAllowed={true}
      ></EntityList>
    </>
  );
}
