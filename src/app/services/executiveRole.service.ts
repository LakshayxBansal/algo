"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getAllRolesDB(
  crmDb: string
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select id as id, name as name from executive_role_master;",
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getExecutiveRoleList(
  crmDb: string,
  searchString: string,
  // department?: number
) {
  try {
    let query = "select id as id, name as name from executive_role_master";
    // let query = "select * from executive_role_master";
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " and name like '%" + searchString + "%'";
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
      query: "call createExecutiveRole(?, ?, ?)",
      values: [
        sourceData.name,
        sourceData.parent_id,
        // sourceData.department_id,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getExecutiveRoleDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "SELECT c1.*, c2.name parentRole FROM executive_role_master c1 left outer join executive_role_master c2 on c1.parent = c2.id \
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
     "SELECT COUNT(*) as count FROM executive_role_master er INNER JOIN executive_master em ON em.role_id = er.id where er.id=?;",      
     values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delExecutiveRoleDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteExecutiveRole(?)",
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
      query: "call updateExecutiveRole(?, ?, ?, ?, ?);",
      values: [
        executiveRoleData.id,
        executiveRoleData.name,
        executiveRoleData.stamp,
        executiveRoleData.parent_id,
        session.user.userId,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getExecutiveRoleByPageDb(
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
      "SELECT *, RowNum AS RowID \
       FROM (SELECT c1.*, c2.name parentRole, ROW_NUMBER() OVER () AS RowNum FROM executive_role_master c1 left outer join executive_role_master c2 on c1.parent = c2.id " +
        (filter ? "WHERE c1.name LIKE CONCAT('%', ?, '%') " : "") + 
      "ORDER BY c1.name \
      ) AS NumberedRows\
      WHERE RowNum > ?*? \
      ORDER BY RowNum\
      LIMIT ?;",
      values: vals,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getExecutiveRoleCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from executive_role_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}