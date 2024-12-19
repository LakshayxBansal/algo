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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function AllocationType() {
  return (
    <>
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
      ></EntityList>
    </>
  );
}
