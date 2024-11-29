"use server";

import excuteQuery from "../utils/db/db";
import {
  enquiryDataSchemaT,
  enquiryHeaderSchemaT,
  enquiryProductSchemaT,
  enquiryLedgerSchemaT,
} from "@/app/models/models";
import { Session } from "next-auth";

export async function createEnquiryDB(
  session: Session,
  enqData: { headerLedger: enquiryDataSchemaT; product: any }
) {
  try {
    const result = excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "call createEnquiry(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        enqData.headerLedger.enq_number,
        enqData.headerLedger.date,
        enqData.headerLedger.contact_id,
        enqData.headerLedger.received_by_id,
        enqData.headerLedger.category_id,
        enqData.headerLedger.source_id,
        enqData.headerLedger.call_receipt_remark,
        enqData.headerLedger.allocated_to_id,
        enqData.headerLedger.status_id,
        enqData.headerLedger.sub_status_id,
        enqData.headerLedger.action_taken_id,
        enqData.headerLedger.next_action_id,
        enqData.headerLedger.next_action_date,
        enqData.headerLedger.suggested_action_remark,
        enqData.headerLedger.action_taken_remark,
        enqData.headerLedger.closure_remark,
        enqData.headerLedger.enquiry_tran_type,
        enqData.headerLedger.active,
        session.user.userId,
        enqData.product
      ],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createEnquiryLedgerDB(
  session: Session,
  ledgerData: enquiryLedgerSchemaT
) {
  try {
    const result = excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "call createEnquiryLedger(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        ledgerData.id,
        ledgerData.status_id,
        ledgerData.sub_status_id,
        ledgerData.action_taken_id,
        ledgerData.next_action_id,
        ledgerData.suggested_action_remark,
        ledgerData.action_taken_remark,
        ledgerData.closure_remark,
        session.user.userId,
        ledgerData.next_action_date
      ],
    });
    return result;
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

export async function getConfigDataDB(crmDb: string) {
  try {
    let query =
      'select ac.config from app_config ac, config_meta_data cm where cm.id=ac.config_type_id AND cm.config_type in("enquiry", "regionalSetting")';
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

export async function getLoggedInUserDetailsDB(crmDb: string, userId: number) {
  try {
    let query = "select * from executive_master em where em.crm_user_id = ?";

    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: [userId],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getHeaderDataAction(session: Session, id: number) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "SELECT h.*, \
       cm.name AS contact_name, \
       em.name AS received_by_name, \
       ecm.name AS category_name, \
       esm.name AS source_name, \
       created.name AS created_by_name, \
       modified.name AS modified_by_name \
  FROM enquiry_header_tran h \
  JOIN contact_master cm ON cm.id = h.contact_id \
  JOIN executive_master em ON em.id = h.received_by_id \
  JOIN enquiry_category_master ecm ON ecm.id = h.category_id \
  JOIN enquiry_source_master esm ON esm.id = h.source_id \
  JOIN executive_master created ON created.id = h.created_by \
  LEFT JOIN executive_master modified ON modified.id = h.modified_by \
  WHERE h.id = ?;",
      values: [id],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getLedgerDataAction(session: Session, id: number) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "SELECT l.*, \
       st.name AS status_name, \
       sub_st.name AS sub_status_name, \
       eam.name AS action_taken_name, \
       next_action.name AS next_action_name, \
       em2.name AS modified_by_name, \
       em3.name AS created_by_name \
  FROM enquiry_ledger_tran l \
  JOIN enquiry_status_master st ON st.id = l.status_id \
  JOIN enquiry_sub_status_master sub_st ON sub_st.id = l.sub_status_id \
  LEFT JOIN enquiry_action_master eam ON eam.id = l.action_taken_id \
  LEFT JOIN enquiry_action_master next_action ON next_action.id = l.next_action_id \
  LEFT JOIN executive_master em2 ON em2.id = l.modified_by \
  JOIN executive_master em3 ON em3.id = l.created_by \
  WHERE l.enquiry_id = ?;",
      values: [id],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductDataAction(session: Session, id: number) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "SELECT i.*, im.name AS product_name, \
      um.name AS unit_name \
 FROM crmapp1.enquiry_product_tran i \
 JOIN crmapp1.unit_master um ON um.id = i.unit_id \
 JOIN crmapp1.product_master im ON im.id = i.product_id \
 WHERE i.enquiry_id = ?;",
      values: [id],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}


export async function getEnquiryDescriptionDb(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, enq_number as name from enquiry_header_tran";
    let values: any[] = [];
    if (searchString !== "") {
      query = query + " where enq_number like '%" + searchString + "%'";
      values = [];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });
    return result;
  }
  catch (e) {
    console.log(e);
  }
}