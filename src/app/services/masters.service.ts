'use server'

import excuteQuery  from '../utils/db/db';

/**
 * 
 * @param getCountryList 
 * @returns list of countries with id
 */


export async function getCountryList(crmDb: string) {

  try {

    const result = await excuteQuery({
      host: crmDb,
      query: 'select countryId as id, nameVal as name from country', 
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function getSalesPersonList(crmDb: string) {

  try {

    const result = await excuteQuery({
      host: crmDb,
      query: 'select cu.coUserId as id, concat(p.firstName, " ", p.lasName) as name, d.nameVal as department, r.nameVal  \
        from coUser cu, employee e, role r, person p, dept d \
        where cu.employeeId = e.employeeId and \
        e.personId = p.personId and \
        e.deptId = d.deptId and \
        e.roleId = r.roleId',
      values: [],
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
export async function getTicketCategoryList(crmDb: string, ticketTypeId: number) {

  try {
    let query = "select ticketCategoryId as id, nameVal as name from ticketCategory ";
    let values: number[] = [];
    if (ticketTypeId){
      query += " where ticketTypeId = ?";
      values = [ticketTypeId];
    }
    const result = await excuteQuery({
      host: crmDb,
      query: query, 
      values: values,
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
export async function getCustomerList(crmDb: string) {

  try {
   return excuteQuery({
      host: crmDb,
      query: "select customerId as Id, nameVal as name from customer \
        order by nameVal", 
      values: [],
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
        query: 'select c.companyId, c.nameVal, c.dbId, u.email, h.host, h.port, d.dbName from \
        company as c, \
          userCompany as uc, \
          user as u, \
          dbInfo as d, \
          dbHost as h \
          where \
          u.email=? and \
          u.userId = uc.userId and \
          uc.companyId = c.companyId and \
          c.dbId = d.dbId and \
          d.hostId = h.hostId \
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
export async function getContactPersonList(crmDb: string, type:string){
  
  try {
    return excuteQuery({
       host: crmDb,
       query: 'select personId as Id, concat(p.firstName, " ", p.lasName) as name, p.* from person p, personType t  where \
         p.personTypeId=t.personTypeId and \
         t.nameVal=?  order by name', 
       values: [type],
     });
 
   } catch (e) {
     console.log(e);
     throw e;
   }

}

/**
 * returns rows from action data based on type specified
 * @param type 
 */
export async function getActionList(crmDb: string, type:string){
  
  try {
    return excuteQuery({
       host: crmDb,
       query: 'select a.actionId as Id, a.nameVal as name from action a, ticketType t  where \
         a.ticketTypeId=t.ticketTypeId and \
         t.nameVal=?  order by name', 
       values: [type],
     });
 
   } catch (e) {
     console.log(e);
     throw e;
   }

}