"use server"
import { Session } from "next-auth";
import {  supportLedgerSchemaT, supportTicketSchemaT } from "../models/models";
import excuteQuery from "../utils/db/db";
import { SUPPORT_ID } from "../utils/consts.utils";

export async function createSupportTicketDB(
    session: Session,
   supportData: supportTicketSchemaT,
   productData: string
  ) {
    try {
     const result = await  excuteQuery({
        host: session.user.dbInfo.dbName,
        query:
          "call createSupportTicket(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?);",
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
          supportData.next_action_date || null ,
          supportData.suggested_action_remark,
          supportData.action_taken_remark,
          supportData.closure_remark,
          supportData.ticket_tran_type,
          supportData.active,
          session.user.userId,
          productData,
          supportData.action_taken_date|| null,
          supportData.c_col1,
          supportData.c_col2,
          supportData.c_col3,
          supportData.c_col4,
          supportData.c_col5,
          supportData.c_col6,
          supportData.c_col7,
          supportData.c_col8,
          supportData.c_col9,
          supportData.c_col10

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
    LEFT JOIN contact_master cm ON cm.id = h.contact_id \
    LEFT JOIN executive_master em ON em.id = h.received_by_id \
    LEFT JOIN ticket_category_master tcm ON tcm.id = h.category_id \
    LEFT JOIN executive_master created ON created.crm_user_id = h.created_by \
    LEFT JOIN executive_master modified ON modified.crm_user_id = h.modified_by \
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
          cfd.id AS custom_id, \
          cfd.c_col1,cfd.c_col2,cfd.c_col3,cfd.c_col4,cfd.c_col5,cfd.c_col6,cfd.c_col7,cfd.c_col8,cfd.c_col9,cfd.c_col10, \
         st.name AS status, \
         sub_st.name AS sub_status, \
         tam.name AS action_taken, \
         next_action.name AS next_action, \
         em2.name AS modified_by_name ,\
         em3.name AS allocated_to_name \
    FROM ticket_ledger_tran l \
    LEFT JOIN ticket_status_master st ON st.id = l.status_id \
    LEFT JOIN ticket_sub_status_master sub_st ON sub_st.id = l.sub_status_id \
    LEFT JOIN ticket_action_master tam ON tam.id = l.action_taken_id \
    LEFT JOIN ticket_action_master next_action ON next_action.id = l.next_action_id \
    LEFT JOIN executive_master em2 ON em2.crm_user_id = l.modified_by \
    LEFT JOIN executive_master em3 ON em3.id =l.allocated_to \
    LEFT JOIN custom_fields_data cfd on cfd.object_id=l.id and cfd.object_type_id=? \
    WHERE l.ticket_id = ? order by l.id;",
        values: [SUPPORT_ID,id],
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
          "call updateSupportTicket(?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?,?,?,?,?,?,?,?,?);",
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
          supportData.next_action_date || null,
          supportData.suggested_action_remark,
          supportData.action_taken_remark,
          supportData.closure_remark,
          supportData.ticket_tran_type,
          supportData.created_by,
          session.user.userId,
          productData,
          supportData.stamp,
          supportData.action_taken_date || null,
          supportData.c_col1,
          supportData.c_col2,
          supportData.c_col3,
          supportData.c_col4,
          supportData.c_col5,
          supportData.c_col6,
          supportData.c_col7,
          supportData.c_col8,
          supportData.c_col9,
          supportData.c_col10
        ],
      });
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  export async function getSupportDataByPageDb(
    session: Session,
    page: number,
    filter: string | undefined,
    limit: number
  ) {
    try {
      const offset = page * limit;
      const vals: any = [limit, offset];
      if (filter) {
        vals.unshift(filter,filter);
      }
      vals.unshift(SUPPORT_ID)
      const result = await excuteQuery({
        host: session.user.dbInfo.dbName,
        query: `
          SELECT h.*,
                 cm.name AS contact, 
                 em.name AS received_by, 
                 tcm.name AS category,
                 pm.name AS product_grid,
                 created.name AS created_by_name, 
                 modified.name AS modified_by_name, 
                 l.id AS ledger_id, 
                 l.suggested_action_remark,
                 cfd.c_col1,cfd.c_col2,cfd.c_col3,
              cfd.c_col4,cfd.c_col5,cfd.c_col6,cfd.c_col7,cfd.c_col8,cfd.c_col9,cfd.c_col10,
                 allocate.name AS allocate_to_name, 
                 st.name AS status, 
                 sub_st.name AS sub_status, 
                 tam.name AS action_taken, 
                 next_action.name AS next_action,
                 l.next_action_date,
                 l.action_taken_remark,
                 l.closure_remark
          FROM ticket_header_tran h 
          LEFT JOIN contact_master cm ON cm.id = h.contact_id 
          LEFT JOIN executive_master em ON em.id = h.received_by_id 
          LEFT JOIN ticket_category_master tcm ON tcm.id = h.category_id 
          LEFT JOIN executive_master created ON created.id = h.created_by 
          LEFT JOIN executive_master modified ON modified.id = h.modified_by 
          LEFT JOIN ticket_ledger_tran l ON l.ticket_id = h.id AND l.active = 1
          LEFT JOIN ticket_product_tran tpt ON tpt.ticket_id = h.id AND 
          tpt.slno = (SELECT MIN(sub_tpt.slno) FROM ticket_product_tran sub_tpt 
          WHERE sub_tpt.ticket_id = h.id)
          LEFT JOIN product_master pm ON pm.id = tpt.product_id
          LEFT JOIN ticket_status_master st ON st.id = l.status_id 
          LEFT JOIN ticket_sub_status_master sub_st ON sub_st.id = l.sub_status_id 
          LEFT JOIN ticket_action_master tam ON tam.id = l.action_taken_id 
          LEFT JOIN ticket_action_master next_action ON next_action.id = l.next_action_id
          LEFT OUTER JOIN custom_fields_data cfd on cfd.object_id=h.id and cfd.object_type_id=?
          LEFT JOIN executive_master allocate ON allocate.id = l.allocated_to 
          ${filter ? "WHERE h.tkt_number LIKE CONCAT('%', ?, '%') OR cm.name LIKE CONCAT('%', ?, '%')" : ""}
          ORDER BY h.id
          LIMIT ? OFFSET ?;
        `,
        values: vals,
      });
  
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  
  export async function getSupportDataCount(
    crmDb: string,
    value: string | undefined
  ) {
    try {
      return excuteQuery({
        host: crmDb,
        query:
          "SELECT count(*) as rowCount from ticket_header_tran " +
          (value ? "WHERE tkt_number LIKE CONCAT('%',?,'%') " : ""),
        values: [value],
      });
    } catch (e) {
      console.log(e);
    }
  }
    
    export async function delSupportDataByIdDb(session: Session, ticketId: number) {
      try {
        const result = await excuteQuery({
          host: session.user.dbInfo.dbName,
          query: "call deleteSupportTicket(?);",
          values: [ticketId],
        });
    
        return result;
      } catch (error:any) {
        console.log(error);
        return { success: false, error: error.message };
      }
    }
    
    export async function getSupportTicketDescriptionDb(crmDb: string, searchString: string) {
      try {
        let query = "select id as id, tkt_number as name from ticket_header_tran";
        let values: any[] = [];
        if (searchString !== "") {
          query = query + " where tkt_number like '%" + searchString + "%'";
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
    
    export async function getLastVoucherNumberSupportDb(session: Session) {
      try {
        let query = "select max(auto_number) as maxAutoNumber from ticket_header_tran ";
        const result = await  excuteQuery({
          host: session.user.dbInfo.dbName,
          query: query,
          values: [],
        });
        return result ;
      } catch (e) {
        console.log(e);
      }
      return null;
    }
  

export async function getSupportTicketsByExecutiveIdDb(crmDb: string, userId: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select ht.tkt_number enqDesc, cm.name contact, lt.date, lt.suggested_action_remark suggestedActionRemark, lt.id, cfd.c_col1, cfd.c_col2,\
			        cfd.c_col3, cfd.c_col4, cfd.c_col5, cfd.c_col6, cfd.c_col7, cfd.c_col8, cfd.c_col9, cfd.c_col10,\
              CASE \
                WHEN (lt.action_taken_id IS NOT NULL AND lt.action_taken_id != 0) THEN JSON_OBJECT('id', lt.action_taken_id, 'name', tm.name)\
                ELSE NULL\
              END AS actionTakenId,\
              CASE \
                WHEN (lt.sub_status_id IS NOT NULL AND lt.sub_status_id != 0) THEN JSON_OBJECT('id', lt.sub_status_id, 'name', ssm.name)\
                ELSE NULL\
              END AS subStatusId,\
              CASE \
                WHEN (lt.next_action_id IS NOT NULL AND lt.next_action_id != 0) THEN JSON_OBJECT('id', lt.next_action_id, 'name', tam.name)\
                ELSE NULL\
              END AS nextActionId,\
              lt.action_taken_remark actionTakenRemark\
              from ticket_header_tran ht \
              left join ticket_ledger_tran lt on lt.ticket_id = ht.id \
              left join contact_master cm on cm.id = ht.contact_id\
              left join ticket_sub_status_master ssm on ssm.id = lt.sub_status_id\
              left join ticket_action_master tm on tm.id = lt.action_taken_id\
              left join ticket_action_master tam on tam.id = lt.next_action_id\
              left join custom_fields_data cfd on cfd.object_id = lt.id AND cfd.object_type_id = (select id from object_type_master where name = 'Support')\
              where lt.active =1 AND \
              lt.allocated_to = (select id from executive_master em where em.crm_user_id = ?) AND lt.status_id = 1\
              ORDER BY lt.date desc;",
              values: [userId],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateSupportTicketStatusDb(
  session: Session,
  ledgerData: supportLedgerSchemaT
) {
  try {
    const result = excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "call updateSupportTicketStatus(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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