"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import {
  delActionById,
  getActionById,
  getEnquiryActionByPage,
} from "@/app/controllers/enquiryAction.controller";
import ActionForm from "@/app/Widgets/masters/masterForms/actionForm";
import UploadFile from "@/app/Widgets/masters/UploadFileForm";
import { createContactsBatch } from "@/app/controllers/contact.controller";
import SecondNavbar from "@/app/cap/navbar/SecondNavbar";
import { Box } from "@mui/material";

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: false,
  },
];

export default function Action() {
  return (
    <>
    <Box sx={{margin: "20px 20px"}}>
      <SecondNavbar title={"List of Action"}/>
    </Box>
      <EntityList
        title="Action"
        renderForm={(fnDialogOpen, fnDialogValue, data) => (
          <ActionForm
            setDialogOpen={fnDialogOpen}
            setDialogValue={fnDialogValue}
            data={data}
          />
        )}
        fileUploadFeatureReqd={true}
        fnFileUpad={createContactsBatch} 
        sampleFileName=""
        fetchDataFn={getEnquiryActionByPage}
        fnFetchDataByID={getActionById}
        fnDeleteDataByID={delActionById}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height = "60vh"
      ></EntityList>
    </>
  );
}
