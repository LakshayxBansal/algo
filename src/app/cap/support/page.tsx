import React from "react";
import { getSession } from "../../services/session.service";
import { redirect } from "next/navigation";
import { logger } from "@/app/utils/logger.utils";
import SupportTicketForm from "./SupportTicketForm";
import { getSupportDataById } from "@/app/controllers/supportTicket.controller";
import { decrypt } from "@/app/utils/encrypt.utils";
import { getLoggedInUserDetails } from "@/app/controllers/enquiry.controller";

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
      let supportData: any = {};
      let formatedSupportData: any;
      if (id) {
        const decryptedId = await decrypt(id);

        supportData = await getSupportDataById(Number(decryptedId));
        formatedSupportData = await formatedData(supportData);
      }

      return (
        <SupportTicketForm
          data={formatedSupportData}
          userDetails={{
            id: userDetails?.data.id,
            name: userDetails?.data.name,
          }}
        />
      );
    }
  } catch (e) {
    // show error page
    logger.error(e);
  }
  redirect("/signin");
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
    date,
    next_action_date,
  };

  return {
    masterData,
    ...remainingLedgerData,
    ...remainingHeaderData,
    productData,
  };
}
