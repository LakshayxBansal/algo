
import React from "react";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import SupportTicketForm from "./SupportTicketForm";
import { getLastVoucherNumberSupport, getSupportDataById } from "@/app/controllers/supportTicket.controller";
import { decrypt } from "@/app/utils/encrypt.utils";
import { getConfigData, getLoggedInUserDetails } from "@/app/controllers/enquiry.controller";
import { adjustToLocal } from "@/app/utils/utcToLocal";
import { Metadata } from "next";
import { getScreenDescription } from "@/app/controllers/object.controller";
import { SUPPORT_ID } from "@/app/utils/consts.utils";
import generateVoucher from "@/app/utils/generateVoucher";
import { last } from "lodash";

export const metadata : Metadata = {
  title : 'Support Tickets'
}

interface searchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Support({ searchParams }: searchParamsProps) {
  try {
    const session = await getSession();

    if (session?.user.dbInfo) {
      const masterData = {
        userName: session.user?.name as string,
      };
      const [userDetails, configData, fields] = await Promise.all([
        getLoggedInUserDetails(),
        getConfigData("support"),
        getScreenDescription(SUPPORT_ID)
      ]);
    
      const id = searchParams.id;
      const status = searchParams.status;
      let supportData: any = {};
      let formatedSupportData: any;
      let newVoucherNumber ;
      let voucherString ;
      if (id) {
        const decryptedId = await decrypt(id);

        supportData = await getSupportDataById(Number(decryptedId));
        newVoucherNumber= supportData?.headerData[0].auto_number;
        voucherString = supportData?.headerData[0].voucher_number;
        const updatedWithSuggestedRemark = await getSuggestedRemark(
          supportData,
          status
        );
        formatedSupportData = await formatedData(updatedWithSuggestedRemark);
      }
      else {
               const lastVoucherNumber= await  getLastVoucherNumberSupport();
               newVoucherNumber= lastVoucherNumber.data[0].maxAutoNumber + 1
               voucherString =await generateVoucher(JSON.parse(configData[0].config).voucher, newVoucherNumber);
          }
      

      return (
        <SupportTicketForm
          data={formatedSupportData}
          userDetails={{
            id: userDetails.id,
            name: userDetails.name,
          }}
          config_data= {JSON.parse(configData[0].config) ?? {}}
          regional_setting= {JSON.parse(configData[1].config) ?? {}}
          status={status}
          fields={fields}
          voucherNumber= {{voucherString , newVoucherNumber}}
        />
      );
    }
  } catch (e) {
    // show error page
    logger.error(e);
  }
  redirect("/signin");
}

async function getSuggestedRemark(data: any, status: any) {
  let length = data.length;
  let ledgerData = data.ledgerData;
  const headerData = data.headerData;
  let lastSuggestedRemark = "";
  let lastActionTakenRemark = "";
  if (status === "true") {
    let suggested_action_remark = headerData[0]?`Call Receipt Remarks:-${
      headerData[0].created_by_name
    } ; ${adjustToLocal(headerData[0].created_on)
      .toDate()
          .toString()
          .slice(0, 21)
    } ; ${headerData[0].call_receipt_remark} \n__________________________________________________________________________________________________________\n`:"";

    if(ledgerData[0].suggested_action_remark){
    suggested_action_remark += `Suggested Action Remarks:- ${
      headerData[0].created_by_name
    } ; ${adjustToLocal(headerData[0].created_on)
      .toDate()
      .toString()
      .slice(0, 21)} ; ${ledgerData[0].suggested_action_remark} \n__________________________________________________________________________________________________________\n`;
    }
    lastSuggestedRemark = ledgerData[0].suggested_action_remark;

    // formating suggested action remark and action taken reamark 
    //format-   modified_by , date , remark
    //
    //


    for (let i = 1; i < ledgerData.length; i++) {
      if (ledgerData[i].suggested_action_remark && ledgerData[i].suggested_action_remark !== lastSuggestedRemark) {
        lastSuggestedRemark= ledgerData[i].suggested_action_remark
        suggested_action_remark += `Suggested Action Remarks:- ${
          ledgerData[i].modified_by_name
        } ; ${adjustToLocal(ledgerData[i].modified_on)
          .toDate()
          .toString()
          .slice(0, 21)} ; ${ledgerData[i].suggested_action_remark} \n__________________________________________________________________________________________________________\n`;
      }
      if (ledgerData[i].action_taken_remark && ledgerData[i].action_taken_remark !== lastActionTakenRemark) {
        lastActionTakenRemark= ledgerData[i].action_taken_remark
        suggested_action_remark += `Action Taken Remarks:-${
          ledgerData[i].modified_by_name
        } ; ${adjustToLocal(ledgerData[i].modified_on)
          .toDate()
          .toString()
          .slice(0, 21)} ; ${ledgerData[i].action_taken_remark} \n__________________________________________________________________________________________________________\n`;
      }
    }
    
    ledgerData = ledgerData[ledgerData.length - 1];
    ledgerData.action_taken_remark = lastActionTakenRemark;
    ledgerData.suggested_action_remark = suggested_action_remark;
  } else {
    let lastRemark = "";
    let n= ledgerData.length;
    for(let i=n-1;i>=0;i--){
      if(ledgerData[i].suggested_action_remark){
        lastRemark = ledgerData[i].suggested_action_remark
        break;
      }
    }
    ledgerData= ledgerData[n - 1];
    ledgerData.suggested_action_remark = lastRemark;
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
      allocated_to: ledger_allocated_to,
      created_on: ledger_created_on,
      modified_on: ledger_modified_on,
      modified_by: ledger_modified_by,
      created_by: ledger_created_by,
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
    docData
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
    allocated_to: {
      id: ledger_allocated_to,
      name: allocated_to_name,
    },
    date,
    next_action_date,
  };

  const result = {
    masterData,
    ledger_allocated_to,
    ledger_created_on,
    ledger_modified_on,
    ledger_modified_by,
    ledger_created_by,
    ...remainingLedgerData,
    ...remainingHeaderData,
    productData,
    docData
  };
  return result;
}
