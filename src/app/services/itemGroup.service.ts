"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getItemGroupList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from item_group_master";
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
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createItemGroupDb(
  session: Session,
  sourceData: zm.itemGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "insert into item_group_master (name, created_by, created_on) \
       values (?, (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [sourceData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 * 
 * @param crmDb database to search in
 * @param id id to search in item_master
 * @returns 
 */
export async function getItemGroupDetailsById(crmDb: string, id: number){
  
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: 'SELECT c1.*, c2.name parent FROM item_group_master c1 left outer join item_group_master c2 on c1.parent_id = c2.id \
        where c1.id=?;', 
      values: [id],
    });

    return result;

  } catch (e) {
    console.log(e);
  }
}