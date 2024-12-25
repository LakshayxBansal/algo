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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { DEPARTMENT_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Department Name",
    editable: false,
  },
];

export default function Department() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Department"}/>
      </Box>
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
        // fnFetchColumns={async ()=> await getColumns("5")}
        customCols={columns}
        AddAllowed={false}
        uploadAllowed={true}
        height = "60vh"
        objectTypeId={DEPARTMENT_OBJECT_ID}
      ></EntityList>
    </>
  );
}
