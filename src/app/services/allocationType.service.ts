"use server";

import * as zm from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";

export async function getAllocationTypeList(
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
    logger.error(e);
  }
}

/**
 *
 * @param session : user session
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createAllocationTypeDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call createAllocationType(?,?)",
      values: [statusData.name, session.user.userId],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

// export async function getAllocationDetailsById(crmDb: string, id: number) {
//   try {
//     const result = await excuteQuery({
//       host: crmDb,
//       query: "select * from allocation_type_master a where a.id=?;",
//       values: [id],
//     });

//     return result;
//   } catch (e) {
//     logger.error(e);
//   }
// }

export async function getAllocationDetailsById(crmDb: string, id: number | undefined) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "SELECT * FROM allocation_type_master WHERE id=?;",
      values: [id],
    });
    return result;
  } catch (e) {
    logger.error(e);
    return [];
  }
}

export async function delAllocationDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from allocation_type_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function updateAllocationTypeDb(
  session: Session,
  statusData: zm.nameMasterDataT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateAllocationType(?,?,?,?);",

      values: [statusData.id, statusData.name, statusData.stamp, session.user.userId],
    });
  } catch (e) {
    logger.error(e);
  }
  return null;
}

export async function getAllocationTypeByPageDb(
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
          FROM allocation_type_master " +
        (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
        "order by name\
      ) AS NumberedRows\
      WHERE RowNum > ?*?\
      ORDER BY RowNum\
      LIMIT ?;",
      values: vals,
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function getAllocationTypeCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from allocation_type_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    logger.error(e);
  }
}

export async function deleteAllocationTypeByIdDb(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "Delete from allocation_type_master where id=?;",
      values: [id],
    });
    console.log(result);
    return result;
  } catch (e) {
    logger.error(e);
  }
}