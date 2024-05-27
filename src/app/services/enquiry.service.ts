"use server"

import excuteQuery  from '../utils/db/db';
import { enquiryHeaderSchemaT, enquiryLedgerSchemaT } from '@/app/models/models';
import { Session } from 'next-auth';


export async function createEnquiryDB(session: Session, enqData: { head: enquiryHeaderSchemaT, ledger:enquiryLedgerSchemaT } ) {
  try {
/*
    INSERT INTO crmapp.enquiry_ledger_tran
    (enquiry_id, status_version, allocated_to, date, executive_id, status_id, sub_status_id, action_taken_id, next_action_id, next_action_date, enquiry_remark, suggested_action_remark,
    action_taken_remark, closure_remark, enquiry_tran_type_id, id, active)
    VALUES
    ();
    
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createEnquiry(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.alias,
        data.name,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state,
        data.pincode,
        data.country,
        data.email,
        data.mobile,
        data.whatsapp,
        data.dob,
        data.doa,
        data.doj,
        data.area,
        data.call_type,
        data.crm_map_id,
        data.role,
        data.executive_dept,
        data.executive_group,    
        session.user.email
      ],
    });*/
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getEnquiryStatusList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from enquiry_status_master';
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