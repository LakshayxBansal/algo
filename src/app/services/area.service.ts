'use server'

import * as zm from '../models/models';
import { Session } from 'next-auth';
import excuteQuery  from '../utils/db/db';


export async function getAreaList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from area_master';
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

export async function getAreaByIDList(crmDb : string, id : string){
  try{
    const result = await excuteQuery({
      host: crmDb,
      query: 'select id as id, name as name from area_master a where a.id=?;', 
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
export async function createAreaDb(session: Session, sourceData: zm.areaSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createArea(?,?);",
      values: [
        sourceData.name,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateAreaDb(session: Session, sourceData: zm.areaSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateArea(?,?);",
      values: [
        sourceData.name,
        sourceData.id
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
