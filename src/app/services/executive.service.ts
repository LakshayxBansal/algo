"use server"

import excuteQuery  from '../utils/db/db';
import {executiveSchemaT} from '../models/models';
import { Session } from 'next-auth';


export async function createExecutiveDB(session: Session, data: executiveSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}


/**
 * 
 * @param crmDb database to search in
 * @param searchString partial string to search in executive_master.name
 * @returns 
 */
export async function getExecutiveList(crmDb: string, searchString: string){
  
  try {
    let query = 'select id as id, name as name from executive_master';
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

export async function getExecutiveIdFromEmailList(crmDb: string, email: string){
  
  try {
    let query = 'select id as id from executive_master where email = ?';
    let values: any[] = [email];

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