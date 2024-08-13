'use server'

import * as zm from '../models/models';
import { Session } from 'next-auth';
import excuteQuery  from '../utils/db/db';


export async function getExecutiveGroupList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from executive_group_master';
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

export async function getExecutiveGroupByIDList(crmDb : string, id : string){
  try{
    const result = await excuteQuery({
      host: crmDb,
      query: 'select id as id, name as name, alias as alias, parent_id as parent from executive_group_master egm where egm.id=?;', 
      values: [id],
    });

    return result;
  }catch(error){
    console.log(error);
  }
}


/**
 * 
 * @param session : user session
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createExecutiveGroupDb(session: Session, sourceData: zm.executiveGroupSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createExecutiveGroup(?,?,?,?);",
      values: [
        sourceData.name,
        sourceData.alias,
        sourceData.parent_id,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateExecutiveGroupDb(session : Session, sourceData : zm.executiveGroupSchemaT){
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateExecutiveGroup(?,?,?,?,?);",
      values: [
        sourceData.name,
        sourceData.alias,
        sourceData.id,
        sourceData.parent_id,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
