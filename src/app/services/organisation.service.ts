"use server"

import excuteQuery  from '../utils/db/db';
import * as z from '../zodschema/zodschema';
import * as zm from '../models/models';
import { Session } from 'next-auth';


export async function createOrganisationDB(session: Session, data: zm.organisationSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into organisation_master \
      (alias, name, print_name, group_id, pan, aadhaar, address1, address2, address3, city, state_id, area_id, pincode, country_id, email, mobile, whatsapp, created_by, created_on, modified_by, modified_on, stamp, dob, doa, department_id, organisation_id) \
      (select ?, ?, ?, ?, ?, ?, ?, ?,  personTypeId from personType t where t.nameVal=?) returning *",
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
 * @param searchString partial string to search in organisation_master.name
 * @returns 
 */
export async function getOrganisationList(crmDb: string, searchString: string){
  
  try {
    let query = 'select id as id, name as name from organisation_master';
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
