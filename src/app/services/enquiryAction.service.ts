"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getEnquiryActionList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from enquiry_action_master";
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
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createEnquiryActionDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createAction(?,?)",
      values: [statusData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getActionDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from enquiry_action_master a where a.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateEnquiryActionDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateAction(?,?,?);",

      values: [statusData.id, statusData.name, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getEnquiryActionByPageDb(
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
        "SELECT * ,RowNum as RowID \
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM enquiry_action_master " +
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

export async function getEnquiryActionCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from enquiry_action_master" +
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
 * @param id id to search in enquiry_action_master_master
 * @returns
 */
export async function fetchEnquiryActionById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from enquiry_action_master where id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}