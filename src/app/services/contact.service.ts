"use server"

import excuteQuery  from '../utils/db/db';
import * as z from '../zodschema/zodschema';
import * as zm from '../models/models';
import { Session } from 'next-auth';


export async function createContactDB(session: Session, data: zm.contactSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into contact_master \
      (alias, name, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, \
        country_id, email, mobile, whatsapp, created_by, created_on, modified_by, modified_on, stamp, dob, doa, department_id, organisation_id) \
      (?, ?, ?, ?, ?, ?, ?, ?,  personTypeId from personType t where t.nameVal=?) returning *",
      values: [
        
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}


/**
 * 
 * @param crmDb database to search in
 * @param searchString partial string to search in contact_master.name
 * @returns 
 */
export async function getContactList(crmDb: string, searchString: string){
  
  try {
    let query = 'select id as id, name as name from contact_master';
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
