"use server";

import excuteQuery from "../utils/db/db";
import { executiveSchemaT } from "../models/models";
import { Session } from "next-auth";
import { logger } from "../utils/logger.utils";

export async function createExecutiveDB(
  session: Session,
  data: executiveSchemaT
) {
  try {
    console.log("DATA in services\n: ", data, "\n");
    // const placeholderDate = new Date("1900-01-01");
    // data.dob = data.dob == "" ? placeholderDate : new Date(data.dob);

    // data.doa = data.doa == "" ? placeholderDate : new Date(data.doa);
    // data.doj = data.doj == "" ? placeholderDate : new Date(data.doj);
    // if (data["dob"] == "") data["dob"] = null;
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call createExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.alias,
        data.name,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.pincode,
        data.country_id,
        data.email,
        data.mobile,
        data.whatsapp,
        data.dob,
        data.doa,
        data.doj,
        data.pan,
        data.aadhaar,
        data.area_id,
        data.call_type,
        data.crm_user_id,
        data.role_id,
        data.executive_dept_id,
        data.executive_group_id,
        session.user.userId,
        data.c_col1,
        data.c_col2,
        data.c_col3,
        data.c_col4,
        data.c_col5,
        data.c_col6,
        data.c_col7,
        data.c_col8,
        data.c_col9,
        data.c_col10
      ],
    });
    console.log('session.user.userId')
    console.log("services : ",result);
    return result;
  } catch (e) {
    logger.error(e);
  }
  return null;
}

export async function updateExecutiveDB(
  session: Session,
  data: executiveSchemaT
) {
  try {
    // console.log("email", session.user.userId);
    // const placeholderDate = new Date("1900-01-01");
    // data.dob = data.dob == "" ? placeholderDate : new Date(data.dob);

    // data.doa = data.doa == "" ? placeholderDate : new Date(data.doa);
    // data.doj = data.doj == "" ? placeholderDate : new Date(data.doj);

    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
      "call updateExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id,
        data.alias,
        data.name,
        data.stamp,
        data.address1,
        data.address2,
        data.address3,
        data.city,
        data.state_id,
        data.pincode,
        data.country_id,
        data.email,
        data.mobile,
        data.whatsapp,
        data.dob,
        data.doa,
        data.doj,
        data.pan,
        data.aadhaar,
        data.area_id,
        data.call_type,
        data.crm_user_id,
        data.role_id,
        data.executive_dept_id,
        data.executive_group_id,
        session.user.userId,
        data.c_col1,
        data.c_col2,
        data.c_col3,
        data.c_col4,
        data.c_col5,
        data.c_col6,
        data.c_col7,
        data.c_col8,
        data.c_col9,
        data.c_col10
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
 * @param searchString partial string to search in executive_master.name
 * @returns
 */
export async function getExecutiveList(crmDb: string, searchString: string) {
  try {
    let query = "select id as id, name as name from executive_master";
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

export async function getExecutiveDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        "select em.*, am.name area, d.name executive_dept, e.name role, egm.name group_name,\
         s.name state, co.name country, us.name as crm_user,eccm.c_col1,eccm.c_col2,eccm.c_col3,\
         eccm.c_col4,eccm.c_col5,eccm.c_col6,eccm.c_col7,eccm.c_col8,eccm.c_col9,eccm.c_col10\
         from executive_master em left join area_master am on am.id=em.area_id\
         left outer join executive_dept_master d on d.id=em.dept_id\
         left outer join  executive_role_master e on em.role_id = e.id \
         left outer join executive_group_master egm on egm.id=em.group_id\
         left outer join state_master s on em.state_id = s.id \
         left outer join country_master co on em.country_id = co.id \
         left outer join userDb.user us on em.crm_user_id=us.id\
         left outer join executive_custom_column_master eccm on eccm.executive_id=em.id\
         where em.id=?",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getProfileDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query:
        `select em.*, am.name area, d.name executive_dept, e.name role, egm.name group_name,\
         s.name state, co.name country, us.name as crm_user\
         from executive_master em left join area_master am on am.id=em.area_id\
         left outer join executive_dept_master d on d.id=em.dept_id\
         left outer join  executive_role_master e on em.role_id = e.id \
         left outer join executive_group_master egm on egm.id=em.group_id\
         left outer join state_master s on em.state_id = s.id \
         left outer join country_master co on em.country_id = co.id \
         left outer join userDb.user us on em.crm_user_id=us.id\
         where em.crm_user_id=?`,
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
        "SELECT COUNT(*) as count FROM executive_master em INNER JOIN enquiry_allocation ea ON ea.executive_id = em.id where em.id=?;",
      values: [id],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function delExecutiveDetailsById(crmDb: string, id: number) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "delete from executive_master where id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getExecutiveByPageDb(
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
        "SELECT *,RowNum AS RowID \
              FROM (select em.*, am.name area, d.name executive_dept, e.name role, egm.name group_name,\
         s.name state, co.name country, us.name as crm_user, ROW_NUMBER() OVER () AS RowNum\
         from executive_master em left join area_master am on am.id=em.area_id\
         left outer join department_master d on d.id=em.dept_id\
         left outer join  executive_role_master e on em.role_id = e.id \
         left outer join executive_group_master egm on egm.id=em.group_id\
         left outer join state_master s on em.state_id = s.id \
         left outer join country_master co on em.country_id = co.id \
         left outer join userDb.user us on em.crm_user_id=us.id " +
        (filter ? "WHERE em.name LIKE CONCAT('%',?,'%') " : "") +
        "order by em.name\
              ) AS NumberedRows \
            WHERE RowNum > ?*? \
            ORDER BY RowNum \
            LIMIT ?;",
      values: vals,
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getExecutiveCount(
  crmDb: string,
  value: string | undefined
) {
  try {
    return excuteQuery({
      host: crmDb,
      query:
        "SELECT count(*) as rowCount from executive_master " +
        (value ? "WHERE name LIKE CONCAT('%',?,'%') " : ""),
      values: [value],
    });
  } catch (e) {
    console.log(e);
  }
}

export async function getExecutiveIdFromEmailList(
  crmDb: string,
  email: string
) {
  try {
    let query = "select id as id from executive_master where email = ?";
    let values: any[] = [email];

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

export async function getExecutiveProfileImageByCrmUserIdList(
  crmDb: string,
  crmUserId: number
) {
  try {
    let query =
      "select profile_img as profileImg from executive_master where crm_user_id = ?";
    let values: any[] = [crmUserId];

    const result = await excuteQuery({
      host: crmDb,
      query: query,
      values: values,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function insertUserIdInExecutiveDb(
  crmDb: string,
  executiveId: number,
  userId: number
) {
  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "update executive_master set crm_user_id =  ? where id = ?;",
      values: [userId, executiveId],
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function getExecutiveColumnsDb(crmDb:string){
  try{
    return excuteQuery({
      host:crmDb,
      query:"select * from custom_fields_master where object_type_id =11",
      values:""
    });
  }catch(e){
    logger.error(e);
  }
}

