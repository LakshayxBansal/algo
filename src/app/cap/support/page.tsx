import React from "react";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import SupportTicketForm from "./SupportTicketForm";
import { getSupportDataById } from "@/app/controllers/supportTicket.controller";
import { decrypt } from "@/app/utils/encrypt.utils";
import { getLoggedInUserDetails } from "@/app/controllers/enquiry.controller";
import { adjustToLocal } from "@/app/utils/utcToLocal";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : ''
}

interface searchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Support({ searchParams }: searchParamsProps) {
  try {
    const session = await getSession();

    if (session) {
      const masterData = {
        userName: session.user?.name as string,
      };
      const userDetails = await getLoggedInUserDetails();
      const id = searchParams.id;
      const status = searchParams.status;
      let supportData: any = {};
      let formatedSupportData: any;
      if (id) {
        const decryptedId = await decrypt(id);

        supportData = await getSupportDataById(Number(decryptedId));
        const updatedWithSuggestedRemark = await getSuggestedRemark(supportData, status);
        formatedSupportData = await formatedData(updatedWithSuggestedRemark);
      }

      return (
        <SupportTicketForm
          data={formatedSupportData}
          userDetails={{
            id: userDetails.id,
            name: userDetails.name,
          }}
          status ={status}
        />
      );
    }
  } catch (e) {
    // show error page
    logger.error(e);
  }
  redirect("/signin");
}

async function getSuggestedRemark(data :any ,status :any){
  let length = data.length;
  let ledgerData= data.ledgerData;
  const headerData= data.headerData;
  if(status==="true"){
    let suggested_action_remark = `${headerData[0].created_by_name} ; ${adjustToLocal(headerData[0].created_on).format("MM-DD-YYYY hh:mm A")} ; ${ledgerData[0].suggested_action_remark} \n`;

      for (let i = 1; i < ledgerData.length; i++) {
        if (ledgerData[i].suggested_action_remark) {
          suggested_action_remark += `${ledgerData[i].modified_by_name} ; ${adjustToLocal(ledgerData[i].modified_on).format("MM-DD-YYYY hh:mm A")} ; ${ledgerData[i].suggested_action_remark} \n`;
        }
      }
      ledgerData = ledgerData[ledgerData.length - 1];

      ledgerData.suggested_action_remark = suggested_action_remark;
      
  }
  else{
    ledgerData = ledgerData[ledgerData.length - 1];
  }
  data.ledgerData = ledgerData;
  data.headerData = headerData[0];
  return data;
}

async function formatedData(supportData: any) {
  const {
    ledgerData: {
      action_taken_id,
      action_taken,
      next_action_id,
      next_action,
      sub_status_id,
      sub_status,
      status_id,
      status,
      next_action_date,
      allocated_to_name,
      allocated_to:ledger_allocated_to,
      created_on: ledger_created_on,
      modified_on: ledger_modified_on,
      modified_by : ledger_modified_by,
      created_by : ledger_created_by,
      ...remainingLedgerData
    },
    headerData: {
      received_by_id,
      received_by,
      contact_id,
      contact,
      category_id,
      category,
      date,
      created_on,
      modified_on,
     
      ...remainingHeaderData
    },
    productData,
  } = supportData;

  // Group all extracted pairs into a single object
  const masterData = {
    action: {
      id: action_taken_id,
      name: action_taken,
    },
    next_action: {
      id: next_action_id,
      name: next_action,
    },
    sub_status: {
      id: sub_status_id,
      name: sub_status,
    },
    status: {
      id: status_id,
      name: status,
    },
    received_by: {
      id: received_by_id,
      name: received_by,
    },
    contact: {
      id: contact_id,
      name: contact,
    },
    category: {
      id: category_id,
      name: category,
    },
    allocated_to:{
      id: ledger_allocated_to,
      name: allocated_to_name,
    },
    date,
    next_action_date,
  };

  const result= {
    masterData,
    ledger_allocated_to,
    ledger_created_on,
    ledger_modified_on,
    ledger_modified_by,
    ledger_created_by,
    ...remainingLedgerData,
    ...remainingHeaderData,
    productData,
  };
  return result;
}
