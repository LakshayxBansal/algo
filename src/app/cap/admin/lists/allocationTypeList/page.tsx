"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import AllocationTypeMasterForm from "@/app/Widgets/masters/masterForms/allocationTypeMaster";
import {
  delAllocationTypeById,
  getAllocationTypeById,
  getAllocationTypeByPage,
} from "@/app/controllers/allocationType.controller";
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { ALLOCATION_TYPE_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function AllocationType() {
  return (
    <>      
      <SecondNavbar title={"List of Allocation"}/>
      <EntityList
        title="Allocation Type"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <AllocationTypeMasterForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getAllocationTypeByPage}
        fnFetchDataByID={getAllocationTypeById}
        fnDeleteDataByID={delAllocationTypeById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
        objectTypeId={ALLOCATION_TYPE_ID}
      ></EntityList>
    </>
  );
}
