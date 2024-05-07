'use server'

import * as zm from '../models/models';
import { Session } from 'next-auth';
import excuteQuery  from '../utils/db/db';


export async function getEnquiryCategoryList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from enquiry_category_master';
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
 * @param session : user session
 * @param categoryData : data for saving
 * @returns result from DB (returning *)
 */
export async function createEnquiryCategoryDb(session: Session, categoryData: zm.nameMasterDataT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into enquiry_category_master (name, created_by, created_on) \
       values (?, (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [
        categoryData.name,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
