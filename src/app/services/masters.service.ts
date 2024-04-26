'use server'

import excuteQuery  from '../utils/db/db';

/**
 * 
 * @param getCountryList 
 * @returns list of countries with id
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
 * returns rows from person data based on type specified
 * @param type 
 */
export async function getContactList(crmDb: string, searchString: string){
  
  try {
    let query = 'select id as id, name as name from contact_master';
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