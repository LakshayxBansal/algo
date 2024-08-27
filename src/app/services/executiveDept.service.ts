"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getExecutiveDeptList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from executive_dept_master";
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
export async function createExecutiveDeptDb(
  session: Session,
  sourceData: zm.executiveDeptSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createExecutiveDept(?, ?);",
      values: [sourceData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateExecutiveDeptDb(
  session: Session,
  sourceData: zm.executiveDeptSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateExecutiveDept(?, ?, ?);",
      values: [sourceData.id, sourceData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getDeptDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from executive_dept_master c where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
