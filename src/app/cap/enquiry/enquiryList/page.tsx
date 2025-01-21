"use client";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import EntityList from "@/app/Widgets/masters/EntityList";
import { createContactsBatch } from "@/app/controllers/contact.controller";
import {
  getEnquiryById,
  getEnquiryDataByPage,
  delEnquiryDataById,
} from "@/app/controllers/enquiry.controller";
import SecondNavbar from "../../navbar/SecondNavbar";
import { ENQUIRY_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "enq_number",
    headerName: "Enquiry Description",
    editable: false,
  },
  {
    field: "contact",
    headerName: "Contact",
    editable: false,
  },
  {
    field: "category",
    headerName: "Category",
    editable: false,
  },
  {
    field: "source",
    headerName: "Source",
    editable: false,
  },
  {
    field: "received_by",
    headerName: "Received By",
    editable: false,
  },
  {
    field: "status",
    headerName: "Status",
    editable: false,
  },
  {
    field: "sub_status",
    headerName: "Sub Status",
    editable: false,
  },

  {
    field: "action_taken",
    headerName: "Action Taken",
    editable: false,
  },
  {
    field: "next_action",
    headerName: " Next Action ",
    editable: false,
  },
];

export default function Action() {
  return (
    <>
        <SecondNavbar title="List of Enquiry Tickets" />
      <EntityList
        title="Enquiry Ticket"
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
      />
    </>
  );
}
