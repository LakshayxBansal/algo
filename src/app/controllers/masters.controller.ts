'use server'
 
import { getCountryList, 
  getExecutiveList, 
  getEnquiryCategoryList, 
  getOrganizationList,
  getMenuOptionsList } from '../services/masters.service';
import { getAppSession } from '../services/session.service';
import {menuTreeT} from '../models/models';

 

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


function createTree(flatArray: menuTreeT[], parentId = 0): menuTreeT[] {
  return flatArray
    .filter(item => item.parent_id === parentId)
    .map(item => ({
      ...item,
      children: createTree(flatArray, item.id)
    }));
}


export async function getCountries(searchString: string) {
  try {
    const appSession = await getAppSession();
    if (appSession?.dbSession) {
      return getCountryList(appSession.dbSession.dbInfo.dbName, searchString);
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



export async function getCustomer(crmDb: string) {
  try {
    const result = await getOrganizationList(crmDb);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
