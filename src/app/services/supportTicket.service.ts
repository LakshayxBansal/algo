"use server"
import { Session } from "next-auth";
import {  supportTicketSchemaT } from "../models/models";
import excuteQuery from "../utils/db/db";

export async function createSupportTicketDB(
    session: Session,
   supportData: supportTicketSchemaT,
   productData: string
  ) {
    try {
     const result = await  excuteQuery({
        host: session.user.dbInfo.dbName,
        query:
          "call createSupportTicket(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?);",
        values: [
          supportData.tkt_number,
          supportData.date,
          supportData.contact_id,
          supportData.received_by_id,
          supportData.category_id,
          supportData.call_receipt_remark,
          supportData.allocated_to_id,
          supportData.status_id,
          supportData.sub_status_id,
          supportData.action_taken_id,
          supportData.next_action_id,
          supportData.next_action_date,
          supportData.suggested_action_remark,
          supportData.action_taken_remark,
          supportData.closure_remark,
          supportData.ticket_tran_type,
          supportData.active,
          session.user.userId,
          productData
        ],
      });

      return result;
    } catch (e) {
      console.log(e);
    }
    return null;
  }

  export async function getHeaderDataAction(session: Session, id: number) {
    try {
      const result = await excuteQuery({
        host: session.user.dbInfo.dbName,
        query:
          "SELECT h.*, \
         cm.name AS contact, \
         em.name AS received_by, \
         tcm.name AS category, \
         created.name AS created_by_name, \
         modified.name AS modified_by_name \
    FROM ticket_header_tran h \
    JOIN contact_master cm ON cm.id = h.contact_id \
    JOIN executive_master em ON em.id = h.received_by_id \
    JOIN ticket_category_master tcm ON tcm.id = h.category_id \
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
         st.name AS status, \
         sub_st.name AS sub_status, \
         tam.name AS action_taken, \
         next_action.name AS next_action, \
         em2.name AS modified_by_name, \
         em3.name AS created_by_name \
    FROM ticket_ledger_tran l \
    LEFT JOIN ticket_status_master st ON st.id = l.status_id \
    LEFT JOIN ticket_sub_status_master sub_st ON sub_st.id = l.sub_status_id \
    LEFT JOIN ticket_action_master tam ON tam.id = l.action_taken_id \
    LEFT JOIN ticket_action_master next_action ON next_action.id = l.next_action_id \
    LEFT JOIN executive_master em2 ON em2.id = l.modified_by \
    LEFT JOIN executive_master em3 ON em3.id = l.created_by \
    WHERE l.ticket_id = ? order by l.id;",
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
          "SELECT i.*, im.name AS product \
 FROM ticket_product_tran i \
 JOIN product_master im ON im.id = i.product_id \
 WHERE i.ticket_id = ?",

        values: [id],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  export async function updateSupportDataDb(session: Session, supportData: supportTicketSchemaT, productData:string) {
    try {
      const result = await excuteQuery({
        host: session.user.dbInfo.dbName,
        query:
          "call updateSupportTicket(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?);",
        values: [
          supportData.id,
          supportData.tkt_number,
          supportData.date,
          supportData.contact_id,
          supportData.received_by_id,
          supportData.category_id,
          supportData.call_receipt_remark,
          supportData.allocated_to_id,
          supportData.status_id,
          supportData.sub_status_id,
          supportData.action_taken_id,
          supportData.next_action_id,
          supportData.next_action_date,
          supportData.suggested_action_remark,
          supportData.action_taken_remark,
          supportData.closure_remark,
          supportData.ticket_tran_type,
          supportData.created_by,
          session.user.userId,
          productData,
          supportData.stamp
        ],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
    
  