"use server";

import { enquirySubStatusMasterT } from "../models/models";
import { Session } from "next-auth";
import excuteQuery from "../utils/db/db";

export async function getEnquirySubStatusList(
  crmDb: string,
  searchString: string,
  status: string
) {
  try {
    const nStatus = Number(status);
    let query =
      "select sb.id as id, sb.name as name from enquiry_sub_status_master sb where \
                  sb.enquiry_status_id= ?";
    let values: any[] = [nStatus];

    if (searchString !== "") {
      query = query + " and sb.name like '%" + searchString + "%'";
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
export async function createEnquirySubStatusDb(
  session: Session,
  sourceData: enquirySubStatusMasterT
) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "insert into enquiry_sub_status_master (name, enquiry_status_id, created_by, created_on) \
       values (?, \
        (select id from enquiry_status_master where name=?), \
        (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [sourceData.name, sourceData.status, session.user.email],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getEnquirySubStatusDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select select sb.id as id, sb.name as name from enquiry_sub_status_master sb where \
                  sb.enquiry_status_id= ?;",
      values: [id],
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
        "SELECT name,RowNum as RowID,id\
       FROM (SELECT *,ROW_NUMBER() OVER () AS RowNum \
          FROM enquiry_sub_status_master " +
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

export async function getEnquirySubStatusCount(crmDb: string, value: string | undefined) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from enquiry_sub_status_master" +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}