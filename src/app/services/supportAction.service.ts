"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getSupportActionList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from ticket_action_master";
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

export async function checkIfActionUsed(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "SELECT COUNT(DISTINCT em.id) as count FROM ticket_action_master em INNER JOIN ticket_action_tran et ON et.ticket_action_id = em.id where em.id=?;",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delSupportActionDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from ticket_action_master where id=?;",
      values: [id],
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
export async function createSupportActionDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    console.log(session.user.dbInfo);

    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createSupportAction(?,?)",
      values: [statusData.name, session.user.userId],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getSupportActionDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from ticket_action_master a where a.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function updateSupportActionDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateSupportAction(?,?,?,?);",

      values: [statusData.id, statusData.name, statusData.stamp, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getSupportActionByPageDb(
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
          FROM ticket_action_master " +
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

export async function getSupportActionCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from ticket_action_master" +
        (value ? " WHERE name LIKE CONCAT('%',?,'%') " : ""),
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
export async function fetchSupportActionById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from ticket_action_master where id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
