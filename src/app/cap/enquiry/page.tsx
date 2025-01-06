import React from "react";
import InputForm from "./InputForm";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import {
  getLoggedInUserDetails,
  getConfigData,
  getEnquiryById,
} from "@/app/controllers/enquiry.controller";
import { getRightsData } from "@/app/controllers/rights.controller";
import { getScreenDescription } from "@/app/controllers/object.controller";
import { ENQUIRY_ID } from "@/app/utils/consts.utils";
import { Metadata } from "next";
import { decrypt } from "@/app/utils/encrypt.utils";
import { adjustToLocal } from "@/app/utils/utcToLocal";

export const metadata: Metadata = {
  title: "Enquiry Tickets",
};

interface searchParamsProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

interface MasterData {
  fields: Array<Record<string, any>>;
  enqData: Record<string, any>;
  // rights: Record<string, any>;
  config_data: Record<string, any>;
  regional_setting: Record<string, any>;
  loggedInUserData: Record<string, any>;
  statusUpdate: boolean;
}

export default async function MyForm({ searchParams }: searchParamsProps) {
  try {
    const session = await getSession();

    if (!session?.user.dbInfo) {
      redirect("/signin");
      return null; // Ensures no further code executes
    }

    const id = searchParams.id;
    const status = searchParams.status;

    // Step 1: Decrypt the ID early if present
    const decryptedId = id ? await decrypt(id) : null;

    // Step 2: Fetch the necessary data in parallel
    const [fields, configData, loggedInUserData] = await Promise.all([
      getScreenDescription(ENQUIRY_ID),
      getConfigData(),
      getLoggedInUserDetails(),
    ]);

    // Step 3: Validate data and handle errors
    if (
      !fields ||
      !configData ||
      !loggedInUserData ||
      !Array.isArray(configData) ||
      configData.length < 2
    ) {
      logger.error("Required data is missing or invalid.");
      redirect("/signin");
      return null;
    }

    // Step 4: Proceed with remaining calls if the ID is present
    let enqData: Record<string, any> | undefined = {};
    if (decryptedId) {
      enqData = await getEnquiryById(Number(decryptedId));
      enqData = await getSuggestedRemark(enqData, status, configData[1].config);
      enqData = await formatedData(enqData);
    }

    // Step 5: Prepare the masterData object
    const masterData: MasterData = {
      fields: fields ?? [],
      enqData: enqData ?? {},
      config_data: JSON.parse(configData[0].config) ?? {},
      regional_setting: JSON.parse(configData[1].config) ?? {},
      loggedInUserData: loggedInUserData ?? {},
      statusUpdate: status === "true" ? true : false,
    };

    // Step 6: Return the component
    return <InputForm baseData={masterData}></InputForm>;
  } catch (e) {
    // show error page
    logger.error("An error occurred:", e);
    redirect("/signin");
    return null;
  }
}

async function getSuggestedRemark(
  data: Record<string, any> | undefined,
  status: string | string[] | undefined,
  dateTimeFormat: any
) {
  let ledgerData = data?.ledgerData;
  const headerData = data?.headerData;

  const { dateFormat, timeFormat } = dateTimeFormat;
  const timeFormatString = timeFormat
    ? timeFormat === "12 Hours"
      ? "hh:mm A"
      : "HH:mm"
    : "HH:mm";
  const modifiedDateTimeFormat = [
    dateFormat || "DD/MM/YYYY", // Add dateFormat if it exists
    timeFormatString, // Add timeFormatString if timeFormat is valid
  ]
    .filter(Boolean)
    .join(" ");

  if (status === "true") {
    let suggested_action_remark = headerData[0]?`Call Receipt Remarks:-${
      headerData[0].created_by_name
    } ; ${adjustToLocal(headerData[0].created_on)
      .toDate()
          .toString()
          .slice(0, 15)
    } ; ${headerData[0].call_receipt_remark} \n__________________________________________________________________________________________________________\n`:"";

    if(ledgerData[0].suggested_action_remark){
    suggested_action_remark += `Suggested Action Remarks:- ${
      ledgerData[0].modified_by_name
    } ; ${adjustToLocal(ledgerData[0].modified_on)
      .toDate()
      .toString()
      .slice(0, 15)} ; ${ledgerData[0].suggested_action_remark} \n__________________________________________________________________________________________________________\n`;
    }
    // let suggested_action_remark = `Call Receipt Remarks:-${
    //   headerData[0].created_by_name
    // } ; ${adjustToLocal(headerData[0].created_on).format(
    //   modifiedDateTimeFormat
    // )} ; ${
    //   headerData[0].call_receipt_remark
    // } \n_______________________________________________________________________________________\n`;

    // formating suggested action remark and action taken reamark
    //format-   modified_by , date , remark
    for (let i = 1; i < ledgerData.length; i++) {
      if (ledgerData[i].suggested_action_remark) {
        suggested_action_remark += `Suggested Action Remarks:- ${
          ledgerData[i].modified_by_name
        } ; ${adjustToLocal(ledgerData[i].modified_on).format(
          modifiedDateTimeFormat
        )} ; ${
          ledgerData[i].suggested_action_remark
        } \n_______________________________________________________________________________________\n`;
      }
      if (ledgerData[i].action_taken_remark) {
        suggested_action_remark += `Action Taken Remarks:-${
          ledgerData[i].modified_by_name
        } ; ${adjustToLocal(ledgerData[i].modified_on).format(
          modifiedDateTimeFormat
        )} ; ${
          ledgerData[i].action_taken_remark
        } \n_______________________________________________________________________________________\n`;
      }
    }
    ledgerData = ledgerData[ledgerData.length - 1];

    ledgerData.suggested_action_remark = suggested_action_remark;
  } else {
    ledgerData = ledgerData[ledgerData.length - 1];
  }
  data?.ledgerData ? (data.ledgerData = ledgerData) : undefined;
  data?.headerData ? (data.headerData = headerData[0]) : undefined;
  return data;
}

async function formatedData(enqData: any) {
  const {
    headerData: {
      contact_id,
      contact,
      received_by_id,
      received_by,
      category_id,
      category,
      source_id,
      source,
      ...remainingHeaderData
    },

    ledgerData: {
      status_id,
      status,
      sub_status_id,
      sub_status,
      action_taken_id,
      action_taken,
      next_action_id,
      next_action,
      allocated_to: allocated_to_id,
      allocated_to_name,
      date: ledger_date,
      // created_on: ledger_created_on,
      modified_on: ledger_modified_on,
      modified_by: ledger_modified_by,
      modified_by_name: ledger_modified_by_name,
      created_by: ledger_created_by,
      created_by_name: ledger_created_by_name,
      ...remainingLedgerData
    },

    productData,
  } = enqData;

  // Group all extracted pairs into a single object
  const defaultData = {
    contact: {
      id: contact_id,
      name: contact,
    },
    received_by: {
      id: received_by_id,
      name: received_by,
    },
    category: {
      id: category_id,
      name: category,
    },
    source: {
      id: source_id,
      name: source,
    },
    status: {
      id: status_id,
      name: status,
    },
    sub_status: {
      id: sub_status_id,
      name: sub_status,
    },
    action_taken: {
      id: action_taken_id,
      name: action_taken,
    },
    next_action: {
      id: next_action_id,
      name: next_action,
    },
    allocated_to: {
      id: allocated_to_id,
      name: allocated_to_name,
    },
  };

  //Convert all the quantity fields from String to Number format
  const updatedProducts = productData.map((product: { quantity: string }) => ({
    ...product,
    quantity: parseFloat(product.quantity), // Convert quantity to a number
  }));

  const result = {
    defaultData,
    ledger_date,
    // ledger_created_on,
    ledger_modified_on,
    ledger_modified_by,
    ledger_modified_by_name,
    ledger_created_by,
    ledger_created_by_name,
    ...remainingHeaderData,
    ...remainingLedgerData,
    updatedProducts,
  };
  return result;
}
