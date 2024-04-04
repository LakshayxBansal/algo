'use server'
 
import { getCountryList, 
  getSalesPersonList, 
  getTicketCategoryList, 
  getTicketStageList, 
  getCustomerList } from '../services/masters.service';
 

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



export async function getCountries(crmDb: string) {
  try {
    const result = await getCountryList(crmDb);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}


export async function getSalesPerson(crmDb: string) {
  try {
    const result = await getSalesPersonList(crmDb);

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
    const result = await getTicketCategoryList(crmDb, ticketTypeId);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}


/**
 * get stages for the ticket
*/ 

export async function getTicketStage(crmDb: string, ticketTypeId: number) {
  try {
    const result = await getTicketStageList(crmDb, ticketTypeId);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}


export async function getCustomer(crmDb: string) {
  try {
    const result = await getCustomerList(crmDb);

    return JSON.stringify(result);
  } catch (error) {
    throw error;
  }
}
