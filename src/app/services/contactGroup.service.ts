"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getContactGroupList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from contact_group_master";
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
export async function createContactGroupDb(
  session: Session,
  sourceData: zm.contactGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createContactGroup(?,?,?,?)",
      values: [
        sourceData.name,
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

export async function updateContactGroupDb(
  session: Session,
  sourceData: zm.contactGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateContactGroup(?,?,?,?,?);",

      values: [
        sourceData.id,
        sourceData.name,
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

/**
 *
 * @param crmDb database to search in
 * @param id id to search in contact_master
 * @returns
 */
export async function getContactGroupDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT c1.*, c2.name parent FROM contact_group_master c1 left outer join contact_group_master c2 on c1.parent_id = c2.id \
        where c1.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delContactDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from contact_group_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getContactGroupByPageDb(
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
        "SELECT *,RowNum as RowID FROM (SELECT c1.*, c2.name parent, ROW_NUMBER() OVER () AS RowNum FROM contact_group_master c1 left outer join contact_group_master c2 on c1.parent_id = c2.id " +
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

export async function getContactGroupCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from contact_group_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}
