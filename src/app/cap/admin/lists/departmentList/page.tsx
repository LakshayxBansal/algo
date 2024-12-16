"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import DepartmentForm from "@/app/Widgets/masters/masterForms/departmentForm";
import {
  delDepartmentById,
  getDepartmentById,
  getDepartmentByPage,
  getDepartmentColumns,
} from "@/app/controllers/department.controller";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Department Name",
    editable: true,
  },
];

export default function Department() {
  return (
    <>
      <EntityList
        title="Department"
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
        fnFetchColumns={getDepartmentColumns}
        customCols={columns}
        AddAllowed={false}
        uploadAllowed={true}
        height = "60vh"
      ></EntityList>
    </>
  );
}
