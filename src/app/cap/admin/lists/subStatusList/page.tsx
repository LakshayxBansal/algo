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
import { Box } from "@mui/material";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { SUB_STATUS_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function subStatus() {
  return (
    <>
      <SecondNavbar title={"List of Sub Status"}/>
      <EntityList
        title="Sub Status"
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
        objectTypeId={SUB_STATUS_OBJECT_ID}
      ></EntityList>
    </>
  );
}
