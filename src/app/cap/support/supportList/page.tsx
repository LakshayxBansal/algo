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
import { delSupportDataById, getSupportDataById, getSupportDataByPage } from "@/app/controllers/supportTicket.controller";
import SupportTicketForm from "../SupportTicketForm";

const columns: GridColDef[] = [
  {
    field: "tkt_number",
    headerName: "Ticket Number",
    editable: true,
  },
  {
    field: "category",
    headerName: "Category",
    editable: true
  },
  {
    field: "contact",
    headerName: "Contact",
    editable: true,
  }
  , {
    field: "status",
    headerName: "Status",
    editable: true
  }
  ,
  {
    field: "sub_status",
    headerName: "Sub Status",
    editable: true
  }, {
    field: "received_by",
    headerName: "Received By",
    editable: true
  },
  {
    field: "action_taken",
    headerName: "Action Taken",
    editable: true,
  }
  , {
    field: "next_action",
    headerName: " Next Action ",
    editable: true
  }
];

export default function Action() {
  return (
    <>
      <EntityList
        title="Support Ticket List"
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
        customCols={columns}
        uploadAllowed={true}
        AddAllowed={false}
        height="60vh"
        link="/cap/support"
      ></EntityList>
    </>
  );
}
