"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getExecutiveRoleList(
  crmDb: string,
  searchString: string,
  department?: number
) {
  try {
    let query = "select id as id, name as name from executive_role_master rm";
    let values: any[] = [department];

    if (department) query += " where rm.department_id= ?";
    if (searchString !== "") {
      if (department) query += " AND";
      else query += " Where";
      query = query + " name like '%" + searchString + "%'";
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
export async function createExecutiveRoleDb(
  session: Session,
  sourceData: zm.executiveRoleSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createExecutiveRole(?, ?, ?, ?)",
      values: [
        sourceData.name,
        sourceData.parent_id,
        sourceData.department_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getExecutiveRoleDetailsById(crmDb: string, id: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT c1.*, c2.name parentName FROM executive_role_master c1 left outer join executive_role_master c2 on c1.parent = c2.id \
        where c1.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateExecutiveRoleDb(
  session: Session,
  executiveRoleData: zm.executiveRoleSchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateExecutiveRole(?, ?, ?, ?);",
      values: [
        executiveRoleData.id,
        executiveRoleData.name,
        executiveRoleData.parent_id,
        executiveRoleData.department_id,
        session.user.email,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
