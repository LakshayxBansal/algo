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
      query: "call createItemGroup(?,?,?,?)",
      values: [
        sourceData.name,
        sourceData.alias,
        sourceData.parent_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateItemGroupDb(
  session: Session,
  sourceData: zm.itemGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateItemGroup(?,?,?,?,?);",

      values: [
        sourceData.id,
        sourceData.name,
        sourceData.alias,
        sourceData.parent_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
// export async function createItemGroupDb(
//   session: Session,
//   sourceData: zm.itemGroupSchemaT
// ) {
//   try {
//     return excuteQuery({
//       host: session.user.dbInfo.dbName,
//       query:
//         "insert into item_group_master (name, created_by, created_on) \
//        values (?, (select crm_user_id from executive_master where email=?), now()) returning *",
//       values: [sourceData.name, session.user.email],
//     });
//   } catch (e) {
//     console.log(e);
//   }
//   return null;
// }

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

export async function delItemGroupDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from item_group_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getItemGroupByPageDb(
  crmDb: string,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT *,RowNum as RowID FROM (SELECT c1.*, c2.name parent, ROW_NUMBER() OVER () AS RowNum FROM item_group_master c1 left outer join item_group_master c2 on c1.parent_id = c2.id " + (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") + "order by name) AS NumberedRows WHERE RowNum > ?*? ORDER BY RowNum LIMIT ?;",
      values: vals,
    });
    console.log(result);
    
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getItemGroupCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from item_group_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}
