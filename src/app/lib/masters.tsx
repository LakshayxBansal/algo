
import excuteQuery from "./db";

/**
 * 
 * @param getCountryList 
 * @returns list of countries with id
 */


export async function getCountryList() {

  try {

    const result = await excuteQuery({
      query: 'select countryId as id, nameVal as name from countries', 
      values: [],
    });

    const stringf = JSON.stringify(result);
    const parsed = JSON.parse(stringf);
    return stringf;

  } catch (e) {
    throw new Error('error in credentials');
  }
}

export async function getSalesPersonList() {

  try {

    const result = await excuteQuery({
      query: 'select salesPersonId as id, concat(firstName, " ", lastName) as name from salesperson;', 
      values: [],
    });

    const stringf = JSON.stringify(result);
    const parsed = JSON.parse(stringf);
    return stringf;

  } catch (e) {
    throw new Error('error in credentials');
  }
}


/**
 * get ticketCategory List from DB filtered by ticketTypeId
 */
export async function getTicketCategoryList(ticketTypeId: number) {

  try {
    let query = "select ticketCategoryId as id, nameVal as name from ticketcategory ";
    let values: number[] = [];
    if (ticketTypeId){
      query += " where ticketTypeId = ?";
      values = [ticketTypeId];
    }
    const result = await excuteQuery({
      query: query, 
      values: values,
    });

    const stringf = JSON.stringify(result);
    const parsed = JSON.parse(stringf);
    return stringf;

  } catch (e) {
    throw new Error('error in credentials');
  }
}


/**
 * get getTicketStageList List from DB filtered by ticketTypeId
 */
export async function getTicketStageList(ticketTypeId: number) {

  try {
    let query = "select ticketStageId as id, nameVal as name from ticketStage ";
    let values: number[] = [];
    if (ticketTypeId){
      query += " where ticketTypeId = ?";
      values = [ticketTypeId];
    }
    const result = await excuteQuery({
      query: query, 
      values: values,
    });

    const stringf = JSON.stringify(result);
    const parsed = JSON.parse(stringf);
    return stringf;

  } catch (e) {
    console.log(e);
    throw new Error('error in credentials');
  }
}