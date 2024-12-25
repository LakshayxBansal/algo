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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { EXECUTIVE_DEPT_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function executiveDept() {
  return (
    <>
      <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Executive Department"}/>
      </Box>
      <EntityList
        title="Executive Department"
        renderForm={(fnDialogOpen, fnDialogValue, metaData, data) => (
          <ExecutiveDeptForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            metaData={metaData}
            data={data}
          />
        )}
        fetchDataFn={getExecutiveDeptByPage}
        fnFetchDataByID={getDeptById}
        fnDeleteDataByID={delExecutiveDeptById}
        fnFetchColumns={10}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
        objectTypeId={EXECUTIVE_DEPT_OBJECT_ID}
      ></EntityList>
    </>
  );
}
