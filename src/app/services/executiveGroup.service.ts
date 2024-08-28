"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getExecutiveGroupList(
  crmDb: string,
  searchString: string
) {
  try {
    let query =
      "select id as id, name as name, alias as alias from executive_group_master";
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

export async function getExecutiveGroupByIDList(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select id as id, name as name, alias as alias, parent_id as parent from executive_group_master egm where egm.id=?;",
      values: [id],
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

/**
 *
 * @param session : user session
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createExecutiveGroupDb(
  session: Session,
  sourceData: zm.executiveGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createExecutiveGroup(?,?,?,?);",
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

export async function updateExecutiveGroupDb(
  session: Session,
  sourceData: zm.executiveGroupSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateExecutiveGroup(?,?,?,?,?);",
      values: [
        sourceData.name,
        sourceData.alias,
        sourceData.id,
        sourceData.parent_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
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
        "SELECT *, RowNum as RowID \
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM executive_group_master " +
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

export async function getExecutiveGroupCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from executive_group_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}
