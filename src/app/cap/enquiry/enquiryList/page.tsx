"use client";
import * as React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import { createContactsBatch } from "@/app/controllers/contact.controller";
import {
  getEnquiryById,
  getEnquiryDataByPage,
  delEnquiryDataById,
} from "@/app/controllers/enquiry.controller";
import { ENQUIRY_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "enq_number",
    headerName: "Enquiry Description",
    editable: true,
  },
  {
    field: "contact",
    headerName: "Contact",
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    editable: true,
  },
  {
    field: "source",
    headerName: "Source",
    editable: true,
  },
  {
    field: "received_by",
    headerName: "Received By",
    editable: true,
  },
  {
    field: "status",
    headerName: "Status",
    editable: true,
  },
  {
    field: "sub_status",
    headerName: "Sub Status",
    editable: true,
  },

  {
    field: "action_taken",
    headerName: "Action Taken",
    editable: true,
  },
  {
    field: "next_action",
    headerName: " Next Action ",
    editable: true,
  },
];

export default function Action() {
  return (
    <>
      <EntityList
        title="Enquiry List"
        fileUploadFeatureReqd={true}
        fnFileUpad={createContactsBatch}
        sampleFileName=""
        fetchDataFn={getEnquiryDataByPage}
        fnFetchDataByID={getEnquiryById}
        fnDeleteDataByID={delEnquiryDataById}
        fnFetchColumns={26}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
        link="/cap/enquiry"
        objectTypeId={ENQUIRY_OBJECT_ID}
      ></EntityList>
    </>
  );
}
