
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
      query: 'select userId as id, concat(firstName, " ", lastName) as name from coUser;', 
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
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
  }
  return null;
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
    const result = await excuteQuery({
      host: crmDb,
      query: query, 
      values: values,
    });
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 * get getCustomerList List from DB
 */
export async function getCustomerList(crmDb: string) {

  try {
   const result = await excuteQuery({
      host: crmDb,
      query: "select customerId as customerId, nameVal as name from customer", 
      values: [],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
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
  }
  return null;
}