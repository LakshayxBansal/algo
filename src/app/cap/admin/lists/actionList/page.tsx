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

const columns: GridColDef[] = [
  {
    field: "name",
    headerName: "Name",
    editable: true,
  },
];

export default function Action() {
  return (
    <>
      <EntityList
        title="Action List"
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
        AddAllowed={true}
      ></EntityList>
    </>
  );
}
