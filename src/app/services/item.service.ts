"use server";

import excuteQuery from "../utils/db/db";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function createItemDB(session: Session, data: zm.itemSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createItem(?,?,?,?,?,?);",
      values: [
        data.name,
        data.group,
        data.alias,
        data.unit,
        data.hsn_code,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateItemDB(session: Session, data: zm.itemSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateItem(?,?,?,?,?,?,?);",
      values: [
        data.id,
        data.name,
        // data.stamp,
        data.group,
        data.alias,
        data.unit,
        data.hsn_code,
        // data.created_by,
        // data.modified_by,
        // data.created_on,
        // data.modified_on,
        session.user.email,
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
 * @param searchString partial string to search in item_master.name
 * @returns
 */
export async function getItemList(crmDb: string, searchString: string) {
  try {
    let query =
      "SELECT im.id AS rowId, im.name, ig.id AS group_id, im.alias, um.id AS unit_id, im.hsn_code \
        FROM item_master im \
        INNER JOIN unit_master um ON im.unit_id = um.id \
        INNER JOIN item_group_master ig ON im.group_id = ig.id \
        WHERE im.id > 0\
        ORDER BY im.id ";
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

export async function DeleteItemList(crmDb: string, id: number) {
  try {
    let query = "Delete from item_master where id=?";
    let values: any[] = [id];

    await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return;
  } catch (e) {
    console.log(e);
  }
}

export async function Pagination(
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

    return excuteQuery({
      host: crmDb,
      query:
        "SELECT name,RowNum as RowID,group_id,id,alias,unit_id,hsn_code \
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM item_master " +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
        "order by name\
      ) AS NumberedRows\
      WHERE RowNum > ?*?\
      ORDER BY RowNum\
      LIMIT ?;",
      values: vals,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getItemCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from item_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

/**
 *
 * @param crmDb database to search in
 * @param id id to search in item_master
 * @returns
 */
export async function fetchItemById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select im.*, gm.name as group_name, um.name as unit_name\
       from item_master im left join item_group_master gm on im.group_id=gm.id \
       left join unit_master um on im.unit_id=um.id where im.id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
