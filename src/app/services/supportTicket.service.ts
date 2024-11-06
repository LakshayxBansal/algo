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
  