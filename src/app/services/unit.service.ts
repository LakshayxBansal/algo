"use server";

import excuteQuery from "../utils/db/db";
import * as zm from "../models/models";
import { Session } from "next-auth";

export async function createUnitDB(session: Session, data: zm.unitSchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createUnit(?,?,?);",
      values: [data.name, data.uqc, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 *
 * @param crmDb database to search in
 * @param searchString partial string to search in unit_master.name
 * @returns
 */
export async function getUnitList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from unit_master";
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
        "SELECT *, RowNum as RowID\
     FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
        FROM unit_master " +
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

export async function getUnitCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from unit_master " +
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
 * @param id id to search in unit_master
 * @returns
 */
export async function fetchUnitById(crmDb: string, id: string) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from unit_master where id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
