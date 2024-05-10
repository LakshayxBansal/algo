'use server'

import * as zm from '../models/models';
import { Session } from 'next-auth';
import excuteQuery  from '../utils/db/db';


export async function getEnquirySubStatusList(crmDb: string, searchString: string, status: string) {

  try {
    let query = 'select sb.id as id, sb.name as name from enquiry_sub_status_master sb, enquiry_status_master st where \
                  st.name=? and \
                  st.id = sb.enquiry_status_id ';
    let values: any[] = [status];

    if (searchString !== "") {
      query = query + " and name like '%" + searchString + "%'";
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
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createEnquirySubStatusDb(session: Session, sourceData: zm.SubStatusSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into enquiry_sub_status_master (name, enquiry_status_id, created_by, created_on) \
       values (?, \
        (select id from enquiry_status_master where name=?), \
        (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [
        sourceData.name,
        sourceData.status,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
