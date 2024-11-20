"use server";

import excuteQuery from "../utils/db/db";
import { docDescriptionSchemaT, executiveSchemaT } from "../models/models";
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
        "call createExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.alias,
        data.name,
        data.address1,
        data.address2,
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
      ],
    });
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
        "call updateExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id,
        data.alias,
        data.name,
        data.stamp,
        data.address1,
        data.address2,
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
    const search_value = searchString ? searchString : '';
    
    const result = await excuteQuery({
      host: crmDb,
      query: "call search_executive(?);",
      values: [search_value]
    })
    return result[0];  
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
         s.name state, co.name country , '' as crm_user \
         from executive_master em left join area_master am on am.id=em.area_id\
         left outer join executive_dept_master d on d.id=em.dept_id\
         left outer join  executive_role_master e on em.role_id = e.id \
         left outer join executive_group_master egm on egm.id=em.group_id\
         left outer join state_master s on em.state_id = s.id \
         left outer join country_master co on em.country_id = co.id \
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
      query: "call deleteExecutive(?)",
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

export async function mapExecutiveToDeptDb(crmDb:string, executiveId: number, deptsArray : number[]){
  try{
    await excuteQuery({
      host:crmDb,
      query:"delete from executive_dept_relation where executive_id = ?;",
      values: [executiveId]
    });
    let insertQuery : string = "insert into executive_dept_relation (executive_id, executive_dept_id) values ";
    for(const dept of deptsArray){
      insertQuery += `(${executiveId}, ${dept}),`
    }
    insertQuery = insertQuery.slice(0, -1);
    insertQuery += ";"
    await excuteQuery({
      host:crmDb,
      query: insertQuery,
      values: []
    });

  }catch(e){
    logger.error(e);
  }
}
