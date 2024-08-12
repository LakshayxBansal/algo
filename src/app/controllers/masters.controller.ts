'use server'
 
import { getCountryList, 
  getExecutiveList, 
  getEnquiryCategoryList, 
  getOrganizationList,
  getMenuOptionsList,
  createCountryDb,
  updateCountryDb,
  createStateDb, 
  getStateList,getCountryByIDList } from '../services/masters.service';
import { getSession } from '../services/session.service';
import * as zs from '../zodschema/zodschema';
import * as zm from '../models/models';
import { SqlError } from 'mariadb';

 

export async function authenticate(formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get("password");
    
    const externalApiUrl = 'http://127.0.0.1/auth';
    const externalApiResponse = await fetch(externalApiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Add any other required headers
        },
        body: JSON.stringify({"email": email, "password": password}),
    });

    return externalApiResponse;
  } catch (e) {
    console.log(e);
  }
  return false;
}


export async function getMenuOptions(crmDb: string) {
  try {
    let menuOptions=[];
    const result =  await getMenuOptionsList(crmDb);

    // create top level menu
    const tree = createTree(result, 0);
    return tree;
  } catch(e) {
    console.log(e);
  }
  return null;
}


function createTree(flatArray: zm.menuTreeT[], parentId = 0): zm.menuTreeT[] {
  return flatArray
    .filter(item => item.parent_id === parentId)
    .map(item => ({
      ...item,
      children: createTree(flatArray, item.id)
    }));
}


export async function getCountries(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCountryList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getCountryById(id : string){
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCountryByIDList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

/**
 * 
 * @param searchState : partial state string to search for
 * @param country : country for which the states need to be searched
 * @returns 
 */
export async function getStates(searchState: string, country: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getStateList(session.user.dbInfo.dbName, searchState, country);
    }
  } catch (error) {
    throw error;
  }
}


export async function getExecutive(crmDb: string, departmentName: string) {
  try {
    const result = await getExecutiveList(crmDb, departmentName);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}


/**
 * get categories for the ticket
 *
 */ 

export async function getTicketCategory(crmDb: string, ticketTypeId: number) {
  try {
    const result = await getEnquiryCategoryList(crmDb);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}



export async function getOrganization(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo.dbName){
      return getOrganizationList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}







/**
 * 
 * @param formData 
 * @returns object with status, record if success and error
 */
export async function createCountry(data: zm.countrySchemaT){
  let result;
    try {
    const session = await getSession();
    if (session) {
  
      const parsed = zs.countrySchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createCountryDb(session, data);
        if (dbResult.length >0 ) {
         result = {status: true, data:dbResult};
        } else {
          result = {status: false, data: [{path:["form"], message:"Error: Error saving record"}] };
        }
      } else {
        result = {status: false, data: parsed.error.issues };
      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e) {
    console.log(e);
    if ((e instanceof SqlError) && e.code === 'ER_DUP_ENTRY' ) {
      result = {status: false, data: [{path:["name"], message:"Error: Value already exist"}] };
      return result;
    }
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}

export async function updateCountry(data: zm.countrySchemaT){
  let result;
    try {
    const session = await getSession();
    if (session) {
  
      const parsed = zs.areaSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await updateCountryDb(session, data);
        if (dbResult.length >0 && dbResult[0][0].error === 0) {
          result = {status: true, data:dbResult[1]};
         } else {
          result = {status: false, data: [{path:[dbResult[0][0].error_path], message:dbResult[0][0].error_text}] };
         }
      } else {
        let errorState: {path: (string | number)[], message: string}[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message});
        }
        result = {status: false, data:errorState };
        return result;
      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e) {
    console.log(e);
    if ((e instanceof SqlError) && e.code === 'ER_DUP_ENTRY' ) {
      result = {status: false, data: [{path:["name"], message:"Error: Value already exist"}] };
      return result;
    }
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}


/**
 * 
 * @param formData 
 * @returns object with status, record if success and error
 */
export async function createState(formData: FormData) {
  let result;
    try {
    const session = await getSession();
    if (session) {
      const data = {
        name: formData.get("name") as string,
        alias: formData.get("alias") as string,
      };
  
      const parsed = zs.nameMasterData.safeParse(data);
      if(parsed.success) {
        const dbResult = await createStateDb(session, data);
        if (dbResult.length >0 ) {
         result = {status: true, data:dbResult};
        } else {
          result = {status: false, data: [{path:["form"], message:"Error: Error saving record"}] };
        }
      } else {
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = {status: false, data: parsed.error.issues };

      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e) {
    console.log(e);
    if ((e instanceof SqlError) && e.code === 'ER_DUP_ENTRY' ) {
      result = {status: false, data: [{path:["name"], message:"Error: Value already exist"}] };
      return result;
    }
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}

