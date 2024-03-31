'use server'
 
import { getCountryList, 
  getSalesPersonList, 
  getTicketCategoryList, 
  getTicketStageList, 
  getCustomerList } from '../services/masters.services';
 
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



export async function getCountries() {
  try {
    const result = await getCountryList();

    return result;

  } catch (error) {
    throw error;
  }
}


export async function getSalesPerson() {
  try {
    const result = await getSalesPersonList();

    return result;

  } catch (error) {
    throw error;
  }
}


/**
 * get categories for the ticket
 *
 */ 

export async function getTicketCategory(ticketTypeId: number) {
  try {
    const result = await getTicketCategoryList(ticketTypeId);

    return result;

  } catch (error) {
    throw error;
  }
}


/**
 * get stages for the ticket
*/ 

export async function getTicketStage(ticketTypeId: number) {
  try {
    const result = await getTicketStageList(ticketTypeId);

    return result;

  } catch (error) {
    throw error;
  }
}


export async function getCustomer() {
  try {
    const result = await getCustomerList();

    return result;

  } catch (error) {
    throw error;
  }
}
