"use server"

import excuteQuery  from '../utils/db/db';
import {enquirySchemaT} from '../models/models';



export async function createEnquiryDB(crmDb: string, data: enquirySchemaT) {
  try {
    let query = 'insert into enquiry_header_tran \
    (date, enq_number, contact_id, received_by_id, category_id, source_id, executive_id, modified_by, modified_on, allocated_to, desc) \
    values (?, ?, ?,)  returning *' 
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