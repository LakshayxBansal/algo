"use server";

import excuteQuery from "../utils/db/db";
import { executiveSchemaT } from "../models/models";
import { Session } from "next-auth";

export async function createExecutiveDB(
  session: Session,
  data: executiveSchemaT
) {
  try {
    // const placeholderDate = new Date("1900-01-01");
    // data.dob = data.dob == "" ? placeholderDate : new Date(data.dob);

    // data.doa = data.doa == "" ? placeholderDate : new Date(data.doa);
    // data.doj = data.doj == "" ? placeholderDate : new Date(data.doj);
    // if (data["dob"] == "") data["dob"] = null;
    const result = await excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call createExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
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
        data.area_id,
        data.call_type_id,
        data.crm_map_id,
        data.role_id,
        data.executive_dept_id,
        data.executive_group_id,
        session.user.email,
      ],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function updateExecutiveDB(
  session: Session,
  data: executiveSchemaT
) {
  try {
    // console.log("email", session.user.email);
    // const placeholderDate = new Date("1900-01-01");
    // data.dob = data.dob == "" ? placeholderDate : new Date(data.dob);

    // data.doa = data.doa == "" ? placeholderDate : new Date(data.doa);
    // data.doj = data.doj == "" ? placeholderDate : new Date(data.doj);

    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query:
        "call updateExecutive(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id,
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
        data.area_id,
        data.call_type,
        data.crm_map_id,
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
        // "select c.id, c.alias, c.name, c.print_name, c.group_id contactGroup_id, c.pan, c.aadhaar, c.address1, c.address2, c.address3, c.city, c.state_id state_id, c.area_id area_id, c.pincode, c.country_id country_id, c.email, c.mobile, c.whatsapp, c.created_by, c.created_on, c.modified_by, c.modified_on, c.stamp, c.dob, c.doa, c.department_id, c.organisation_id organisation_id, \
        // g.name contactGroup, s.name state, a.name area, co.name country, d.name department, o.name organisation \
        // from executive_master c \
        // left outer join state_master s on c.state_id = s.id \
        // left outer join area_master a on c.area_id =  a.id \
        // left outer join country_master co on c.country_id = co.id \
        // left outer join department_master d on c.department_id = d.id \
        // left outer join  executive_role_master e on c.role_id = e.id \
        // left outer join  executive_group_master eg on c.group_id = eg.id \
        // left outer join user us on c.cem_user_id=us.id\
        // where c.id=?;",
        "select em.*, am.name area, d.name executive_dept, e.name role, egm.name group_name,\
         s.name state, co.name country, us.name as crm_user\
         from executive_master em left join area_master am on am.id=em.area_id\
         left outer join department_master d on d.id=em.dept_id\
         left outer join  executive_role_master e on em.role_id = e.id \
         left outer join executive_group_master egm on egm.id=em.group_id\
         left outer join state_master s on em.state_id = s.id \
         left outer join country_master co on em.country_id = co.id \
         left outer join userDb.user us on em.crm_user_id=us.id\
         where em.id=?",
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
            (filter ? "WHERE name LIKE CONCAT('%',?,'%') " : "") +
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

export async function getExecutiveIdFromEmailList(crmDb: string, email: string){
  
  try {
    let query = 'select id as id from executive_master where email = ?';
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

export async function getExecutiveProfileImageByCrmUserIdList(crmDb : string,crmUserId : number){
  try{
    let query = 'select profile_img as profileImg from executive_master where crm_user_id = ?';
    let values: any[] = [crmUserId];

    const result = await excuteQuery({
      host: crmDb,
      query: query, 
      values: values,
    });

    return result;
  }catch(error){
    console.log(error);
  }
}