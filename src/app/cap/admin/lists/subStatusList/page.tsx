"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  delSubStatusById,
  getEnquirySubSatusById,
  getEnquirySubStatusByPage,
} from "@/app/controllers/enquirySubStatus.controller";
import SubStatusListForm from "@/app/Widgets/masters/masterForms/subStatusListForm";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function subStatus() {
  return (
    <>
      <EntityList
        title="Sub Status Master"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <SubStatusListForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fetchDataFn={getEnquirySubStatusByPage}
        fnFetchDataByID={getEnquirySubSatusById}
        fnDeleteDataByID={delSubStatusById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
