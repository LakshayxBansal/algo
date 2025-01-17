"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getProductGroupList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from product_group_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    query = query + " order by name";
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

export async function createProductGroupDb(
  session: Session,
  sourceData: zm.productGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createProductGroup(?,?,?,?,?)",
      values: [
        sourceData.name,
        sourceData.alias,
        sourceData.parent_id,
        sourceData.is_parent,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateProductGroupDb(
  session: Session,
  sourceData: zm.productGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateProductGroup(?,?,?,?,?,?);",

      values: [
        sourceData.id,
        sourceData.name,
        sourceData.stamp,
        sourceData.alias,
        sourceData.parent_id,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
// export async function createProductGroupDb(
//   session: Session,
//   sourceData: zm.productGroupSchemaT
// ) {
//   try {
//     return excuteQuery({
//       host: session.user.dbInfo.dbName,
//       query:
//         "insert into product_group_master (name, created_by, created_on) \
//        values (?, (select crm_user_id from executive_master where email=?), now()) returning *",
//       values: [sourceData.name, session.user.userId],
//     });
//   } catch (e) {
//     console.log(e);
//   }
//   return null;
// }

/**
 *
 * @param crmDb database to search in
 * @param id id to search in product_master
 * @returns
 */
export async function getProductGroupDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT c1.*, c2.name parent FROM product_group_master c1 left outer join product_group_master c2 on c1.parent_id = c2.id \
        where c1.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function checkIfUsed(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
     "SELECT COUNT(*) as count FROM product_group_master ig INNER JOIN product_master im ON im.group_id = ig.id where ig.id=?;",      
     values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delProductGroupDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteProductGroup(?)",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getProductGroupByPageDb(
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
        "SELECT *,RowNum as RowID FROM (SELECT c1.*, c2.name parent, ROW_NUMBER() OVER () AS RowNum FROM product_group_master c1 left outer join product_group_master c2 on c1.parent_id = c2.id " +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
        "order by name) AS NumberedRows WHERE RowNum > ?*? ORDER BY RowNum LIMIT ?;",
      values: vals,
    });
    console.log(result);

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getProductGroupCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from product_group_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}
