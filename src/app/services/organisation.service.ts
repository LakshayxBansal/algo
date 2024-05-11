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
      (alias, name, print_name, pan, gstin, address1, address2, address3, city, state_id, pincode, country_id, created_by, created_on) \
      (?, ?, ?, ?, ?, ?, ?, ?, ?, (select id from state_master where name=?), ?, (select id from country_master where name=?), (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [
        data.alias,
        data.name,
        data.printName,
        data.pan,
        data.gstin,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state,
        data.pincode,
        data.country,
        session.user.email
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
