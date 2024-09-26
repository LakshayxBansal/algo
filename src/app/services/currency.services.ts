"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

// export async function getContactGroupList(crmDb: string, searchString: string) {
//   try {
//     let query = "select id as id, name as name from contact_group_master";
//     let values: any[] = [];

//     if (searchString !== "") {
//       query = query + " where name like '%" + searchString + "%'";
//       values = [];
//     }
//     const result = await excuteQuery({
//       host: crmDb,
//       query: query,
//       values: values,
//     });

//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// }

/**
 *
 * @param session : user session
 * @param sourceData : data for saving
 * @returns result from DB (returning *)
 */
export async function createCurrencyDb(
  session: Session,
  sourceData: zm.currencySchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        // "insert into currency_data (symbol,name,shortForm,decimal_places,currency_system) values(?,?,?,?,?) returning*",
        "call createCurrency(?,?,?,?,?)",
      values: [
        sourceData.symbol,
        sourceData.name,
        sourceData.shortForm,
        sourceData.decimal_places,
        sourceData.currency_system,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateCurrencyDb(
  session: Session,
  sourceData: zm.currencySchemaT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateCurrency(?,?,?,?,?,?);",

      values: [
        sourceData.id,
        sourceData.symbol,
        sourceData.name,
        sourceData.shortForm,
        sourceData.decimal_places,
        sourceData.currency_system,
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
export async function getCurrencyDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select * from currency_data a where a.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getCurrencyByPageDb(
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
        "SELECT *,RowNum as RowID FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum FROM currency_data " +
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

export async function getCurrencyCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from currency_data" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function delCurrencyByIdDB(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from currency_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}
