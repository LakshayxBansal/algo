"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getSupportCategoryList(
  crmDb: string,
  searchString: string
) {
  try {
    let query = "select id as id, name as name from ticket_category_master";
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

export async function getSupportCategoryDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from ticket_category_master c where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delSupportCategoryDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "call deleteSupportCategory(?)",
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
 * @param categoryData : data for saving
 * @returns result from DB (returning *)
 */
export async function createSupportCategoryDb(
  session: Session,
  categoryData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createSupportCategory(?, ?)",
      values: [categoryData.name, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateSupportCategoryDb(
  session: Session,
  categoryData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateSupportCategory(?, ?, ?, ?);",
      values: [categoryData.id, categoryData.name, categoryData.stamp, session.user.userId],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getSupportCategoryByPageDb(
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
        "SELECT * ,RowNum as RowID\
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM ticket_category_master " +
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

export async function getSupportCategoryCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from ticket_category_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}
