"use server"

import excuteQuery  from '../utils/db/db';
import * as z from '../zodschema/zodschema';
import * as zm from '../models/models';
import { Session } from 'next-auth';


export async function createContactDB(session: Session, data: zm.contactSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createContact(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.alias,
        data.name,
        data.print_name,
        data.contactGroup_id,
        data.pan,
        data.aadhaar,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.area_id,
        data.pincode,
        data.country_id,
        data.email,
        data.mobile,
        data.whatsapp,
        data.dob,
        data.doa,
        data.department_id,
        data.organisation_id,
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


/**
 * 
 * @param crmDb database to search in
 * @param id id to search in contact_master
 * @returns 
 */
export async function fetchContactById(crmDb: string, id: string){
  
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: 'select * from contact_master where id=?', 
      values: [id],
    });

    return result;

  } catch (e) {
    console.log(e);
  }
}
