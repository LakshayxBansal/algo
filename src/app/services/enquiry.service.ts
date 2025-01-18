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
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call createEnquiry(?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
        enqData.product,
        enqData.headerLedger.action_taken_date,
        enqData.headerLedger.c_col1,
        enqData.headerLedger.c_col2,
        enqData.headerLedger.c_col3,
        enqData.headerLedger.c_col4,
        enqData.headerLedger.c_col5,
        enqData.headerLedger.c_col6,
        enqData.headerLedger.c_col7,
        enqData.headerLedger.c_col8,
        enqData.headerLedger.c_col9,
        enqData.headerLedger.c_col10,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  
}

export async function updateEnquiryDB(
  session: Session,
  enqData: { headerLedger: enquiryDataSchemaT; product: any }
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call updateEnquiry(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        enqData.headerLedger.id,
        enqData.headerLedger.enq_number,
        enqData.headerLedger.date,
        enqData.headerLedger.contact_id,
        enqData.headerLedger.received_by_id,
        enqData.headerLedger.category_id,
        enqData.headerLedger.source_id,
        enqData.headerLedger.stamp,
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
        enqData.headerLedger.created_by,
        session.user.userId,
        enqData.product,
        enqData.headerLedger.action_taken_date,
        enqData.headerLedger.c_col1,
        enqData.headerLedger.c_col2,
        enqData.headerLedger.c_col3,
        enqData.headerLedger.c_col4,
        enqData.headerLedger.c_col5,
        enqData.headerLedger.c_col6,
        enqData.headerLedger.c_col7,
        enqData.headerLedger.c_col8,
        enqData.headerLedger.c_col9,
        enqData.headerLedger.c_col10,
      ],
    });
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

export async function getConfigDataDB(crmDb: string,formName:string) {
  try {
    let query =
      `select ac.config from app_config ac, config_meta_data cm where cm.id=ac.config_type_id AND cm.config_type in('${formName}', "regionalSetting") `;
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

export async function getHeaderDataAction(session: Session, id: number | undefined) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "SELECT h.*, \
      cm.name AS contact, \
      em.name AS received_by, \
      ecm.name AS category, \
      esm.name AS source, \
      created.name AS created_by_name, \
      modified.name AS modified_by_name \
      FROM enquiry_header_tran h \
      LEFT JOIN contact_master cm ON cm.id = h.contact_id \
      LEFT JOIN executive_master em ON em.id = h.received_by_id \
      LEFT JOIN enquiry_category_master ecm ON ecm.id = h.category_id \
      LEFT JOIN enquiry_source_master esm ON esm.id = h.source_id \
      LEFT JOIN executive_master created ON created.crm_user_id = h.created_by \
      LEFT JOIN executive_master modified ON modified.id = h.modified_by \
      WHERE h.id = ?;",
      values: [id],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getLedgerDataAction(session: Session, id: number| undefined) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "SELECT l.*, \
      st.name AS status, \
      sub_st.name AS sub_status, \
      eam.name AS action_taken, \
      next_action.name AS next_action, \
      em1.name AS allocated_to_name, \
      em2.name AS modified_by_name, \
      em3.name AS created_by_name, \
      cfd.c_col1, cfd.c_col2, cfd.c_col3, cfd.c_col4, cfd.c_col5, cfd.c_col6, cfd.c_col8, cfd.c_col7, cfd.c_col9, cfd.c_col10 \
      FROM enquiry_ledger_tran l \
      LEFT JOIN enquiry_status_master st ON st.id = l.status_id \
      LEFT JOIN enquiry_sub_status_master sub_st ON sub_st.id = l.sub_status_id \
      LEFT JOIN enquiry_action_master eam ON eam.id = l.action_taken_id \
      LEFT JOIN enquiry_action_master next_action ON next_action.id = l.next_action_id \
      LEFT JOIN executive_master em1 ON em1.id = l.allocated_to \
      LEFT JOIN executive_master em2 ON em2.id = l.modified_by \
      LEFT JOIN executive_master em3 ON em3.id = l.created_by \
      LEFT JOIN custom_fields_data cfd on cfd.object_id=l.id and cfd.object_type_id=26 \
      WHERE l.enquiry_id = ?;",
      values: [id],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getProductDataAction(session: Session, id: number| undefined) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "SELECT i.*, im.name AS product, \
      um.name AS unit \
      FROM enquiry_product_tran i \
      LEFT JOIN unit_master um ON um.id = i.unit_id \
      LEFT JOIN product_master im ON im.id = i.product_id \
      WHERE i.enquiry_id = ?;",
      values: [id],
    });
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getEnquiryDataByPageDb(
  session: Session,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const offset = page * limit;
    const vals: any = [limit, offset];
    if (filter) {
      vals.unshift(filter);
    }

    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query: `
        SELECT h.*, 
               cm.name AS contact, 
               em.name AS received_by, 
               ecm.name AS category, 
               esm.name AS source,
              pm.name as product_grid,
               created.name AS created_by_name,
               modified.name AS modified_by_name,
               l.id AS ledger_id, 
               allocate.name AS allocate_to_name, 
               cfd.c_col1,cfd.c_col2,cfd.c_col3,
              cfd.c_col4,cfd.c_col5,cfd.c_col6,cfd.c_col7,cfd.c_col8,cfd.c_col9,cfd.c_col10,
               l.suggested_action_remark, 
               st.name AS status, 
               sub_st.name AS sub_status, 
               eam.name AS action_taken, 
               next_action.name AS next_action,
               l.next_action_date,
               l.closure_remark,
               l.action_taken_remark
        FROM enquiry_header_tran h 
        LEFT JOIN contact_master cm ON cm.id = h.contact_id 
        LEFT JOIN executive_master em ON em.id = h.received_by_id 
        LEFT JOIN enquiry_category_master ecm ON ecm.id = h.category_id
        LEFT JOIN enquiry_source_master esm ON esm.id = h.source_id
        LEFT JOIN executive_master created ON created.id = h.created_by
        LEFT JOIN enquiry_product_tran ept ON ept.enquiry_id = h.id AND 
        ept.slno = (SELECT MIN(sub_ept.slno) FROM enquiry_product_tran sub_ept 
        WHERE sub_ept.enquiry_id = h.id)
        LEFT JOIN product_master pm ON pm.id = ept.product_id
        LEFT JOIN executive_master modified ON modified.id = h.modified_by 
        LEFT JOIN enquiry_ledger_tran l ON l.enquiry_id = h.id AND l.active = 1 
        LEFT JOIN executive_master allocate ON allocate.id = l.allocated_to 
        LEFT JOIN enquiry_status_master st ON st.id = l.status_id 
        LEFT JOIN enquiry_sub_status_master sub_st ON sub_st.id = l.sub_status_id 
        LEFT JOIN enquiry_action_master eam ON eam.id = l.action_taken_id 
        LEFT OUTER JOIN custom_fields_data cfd on cfd.object_id=h.id and cfd.object_type_id=26
        LEFT JOIN enquiry_action_master next_action ON next_action.id = l.next_action_id 
        ${filter ? "WHERE enq_number LIKE CONCAT('%', ?, '%')" : ""}
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

export async function getEnquiryDataCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from enquiry_header_tran " +
        (value ? "WHERE enq_number LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function delEnquiryDataByIdDb(session: Session, enquiryID: number) {
  try {
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call deleteEnquiry(?);",
      values: [enquiryID],
    });

    return result;
  } catch (error:any) {
    console.log(error);
    return { success: false, error: error.message };
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

export async function getLastVoucherNumberEnquiryDb(session: Session) {
  try {
    let query = "select max(auto_number) as maxAutoNumber from enquiry_header_tran ";
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