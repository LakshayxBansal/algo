'use server'

import excuteQuery  from '../utils/db/db';
import * as zm from '../models/models';
import { Session } from 'next-auth';


/**
 * 
 * @param crmDb 
 * @param searchString - partial string for country 
 * @returns 
 */
export async function getCountryList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from country_master';
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

export async function getCountryByIDList(crmDb : string, id : string){
  try{
    const result = await excuteQuery({
      host: crmDb,
      query: 'select id as id, name as name, alias as alias from country_master cm where cm.id=?;', 
      values: [id],
    });

    return result;
  }catch(error){
    console.log(error);
  }
}



/**
 * 
 * @param crmDb 
 * @param searchString - partial string for country 
 * @returns 
 */
export async function getStateList(crmDb: string, searchState: string, country: string) {

  try {
    let query = 'select s.id as id, s.name as name from state_master s, country_master c where \
        c.name = ? and \
        c.id = s.country_id ';
    let values: any[] = [country];

    if (searchState !== "") {
      query = query + " and s.name like '%" + searchState + "%'";
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

export async function getExecutiveList(crmDb: string, departmentName: string) {

  try {

    const result = await excuteQuery({
      host: crmDb,
      query: 'select e.id as id, e.name as name, d.name as department, r.name as role  \
        from executive_master e, role_master r, department_master d \
        where e.role_id = r.id and \
        r.department_id = d.id and \
        d.name = ?',
      values: [departmentName],
    });

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}


/**
 * get ticketCategory List from DB filtered by ticketTypeId
 */
export async function getEnquiryCategoryList(crmDb: string) {

  try {
    const result = await excuteQuery({
      host: crmDb,
      query: "select id as id, name as name from enquiry_category_master ", 
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
    throw e;
  }
}


/**
 * get getTicketStageList List from DB filtered by ticketTypeId
 */
export async function getTicketStageList(crmDb: string, ticketTypeId: number) {

  try {
    let query = "select ticketStageId as id, nameVal as name from ticketStage ";
    let values: number[] = [];
    if (ticketTypeId){
      query += " where ticketTypeId = ?";
      values = [ticketTypeId];
    }
    return excuteQuery({
      host: crmDb,
      query: query, 
      values: values,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}

/**
 * get getCustomerList List from DB
 */
export async function getOrganizationList(crmDb: string, searchString: string) {

  try {
    let query = 'select id as id, name as name from organisation_master';
    let values: any[] = [];

    if (searchString !== "") {
      query = query + " where name like '%" + searchString + "%'";
      values = [];
    }
    return excuteQuery({
      host: crmDb,
      query: query, 
      values: values,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
}


/**
 * Get the list of companies for the given userId
 * @param email: <sring> email for the user for which the eligible companies to be returned.
 * @returns list of companies
 */
export async function getCompanyList(email: string | undefined | null) {
  try {
    if (email) {
      const result = await excuteQuery({
        host: 'userDb',
        query: 'select c.id as company_id, c.name as companyName, c.dbinfo_id, h.host, h.port, d.name as dbName from \
        company as c, \
          userCompany as uc, \
          user as u, \
          dbInfo as d, \
          dbHost as h \
          where \
          u.email=? and \
          u.id = uc.user_id and \
          uc.company_id = c.id and \
          c.dbinfo_id = d.id and \
          d.host_id = h.id \
          ;', 
        values: [email],
      });
      //Object.values(JSON.parse(JSON.stringify(
      //const stringf = JSON.stringify(result);
      const parsed = JSON.parse(JSON.stringify(result));

      return result.valueOf();
    }
  } catch (e) {
    console.log(e);
    throw e;
 }
}




/**
 * returns rows from action data based on type specified
 * @param type 
 */
export async function getEnquiryActionList(crmDb: string){
  
  try {
    return excuteQuery({
       host: crmDb,
       query: 'select a.id as id, a.name as name from enquiry_action_master a order by a.name', 
       values: [],
     });
 
   } catch (e) {
     console.log(e);
     throw e;
   }

}

export async function getMenuOptionsList(crmDb: string) {
  try {
    return excuteQuery({
       host: crmDb,
       query: 'select * from menu_option_master order by parent_id, menu_order', 
       values: [],
     });
 
   } catch (e) {
     console.log(e);
     throw e;
   }

}



/**
 * 
 * @param session : user session
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createCountryDb(session: Session, statusData: zm.nameAliasDataT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into country_master (name, alias, created_by, created_on) \
       values (?, ?, (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [
        statusData.name,
        statusData.alias,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
export async function updateCountryDb(session: Session, sourceData: zm.countrySchemaT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "call updateCountry(?,?,?);",
      values: [
        sourceData.name,
        sourceData.id,
        sourceData.alias
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}


/**
 * 
 * @param session : user session
 * @param statusData : data for saving
 * @returns result from DB (returning *)
 */
export async function createStateDb(session: Session, statusData: zm.nameAliasDataT) {
  try {
    return excuteQuery({
      host: session.user.dbInfo.dbName,
      query: "insert into state_master (name, alias, created_by, created_on) \
       values (?, ?, (select crm_user_id from executive_master where email=?), now()) returning *",
      values: [
        statusData.name,
        statusData.alias,
        session.user.email
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
