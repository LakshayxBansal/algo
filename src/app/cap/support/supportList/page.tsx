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
import {
  delSupportDataById,
  getSupportDataById,
  getSupportDataByPage,
} from "@/app/controllers/supportTicket.controller";
import SupportTicketForm from "../SupportTicketForm";
import SecondNavbar from "../../navbar/SecondNavbar";
import { Box } from "@mui/material";
import { SUPPORT_OBJECT_ID } from "@/app/utils/consts.utils";

const columns: GridColDef[] = [
  {
    field: "tkt_number",
    headerName: "Ticket Number",
    editable: false,
  },
  {
    field: "category",
    headerName: "Category",
    editable: false,
  },
  {
    field: "contact",
    headerName: "Contact",
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
    field: "received_by",
    headerName: "Received By",
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
        <SecondNavbar title="List of Support Tickets" />
      <EntityList
        title="Support Ticket"
        // renderForm={(fnDialogOpen, fnDialogValue, data) => (
        //   <SupportTicketForm
        //     setDialogOpen={fnDialogOpen}
        //     setDialogValue={fnDialogValue}
        //     data={data}
        //   />
        // )}
        fileUploadFeatureReqd={true}
        fnFileUpad={createContactsBatch}
        sampleFileName=""
        fetchDataFn={getSupportDataByPage}
        fnFetchDataByID={getSupportDataById}
        fnDeleteDataByID={delSupportDataById}
        fnFetchColumns={28}
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
        link="/cap/support"
        objectTypeId={SUPPORT_OBJECT_ID}
      ></EntityList>
    </>
  );
}
