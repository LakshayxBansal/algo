"use server";

import excuteQuery from "../utils/db/db";
import {
  enquiryHeaderSchemaT,
  enquiryLedgerSchemaT,
} from "@/app/models/models";
import { Session } from "next-auth";

export async function createEnquiryDB(
  session: Session,
  enqData: { head: enquiryHeaderSchemaT; ledger: enquiryLedgerSchemaT }
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call createEnquiry(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        enqData.head.enq_number,
        enqData.head.date,
        enqData.head.contact_id,
        enqData.head.received_by_id,
        enqData.head.category_id,
        enqData.head.source_id,
        enqData.head.call_receipt_remark,
        enqData.ledger.allocated_to_id,
        enqData.ledger.status_id,
        enqData.ledger.sub_status_id,
        enqData.ledger.action_taken_id,
        enqData.ledger.next_action_id,
        enqData.ledger.next_action_date,
        enqData.ledger.suggested_action_remark,
        enqData.ledger.action_taken_remark,
        enqData.ledger.closure_remark,
        enqData.ledger.enquiry_tran_type,
        enqData.ledger.active,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getEnquiryStatusList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from enquiry_status_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function showItemGridDB(crmDb: string) {
  try {
    let query =
      'select ac.config from app_config ac, config_meta_data cm where cm.id=ac.config_type_id and cm.config_type="enquiry_support"';
    let values: any[] = [];

    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
