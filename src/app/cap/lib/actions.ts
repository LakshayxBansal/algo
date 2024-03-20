'use server'
 
import { authenticateUser } from './auth';
import { getCountryList, getSalesPersonList, getTicketCategoryList, getTicketStageList, getCustomerList } from './masters';
 
export async function authenticate(formData: FormData) {
  try {
    let email = formData.get('email');
    let password = formData.get("password");
    
    const success = await authenticateUser({"email": email, "password": password});

    return success;
  } catch (error) {
    throw error;
  }
}


/*
export async function createUser(formData: FormData) {
  try {
    const email = formData.get('email');
    const password = formData.get("password");
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");

    const success = await signUp({
      "email": email, 
      "password": password, 
      "firstname": firstName, 
      "lastname": lastName
    });

    return success;

  } catch (error) {
    throw error;
  }
}
*/


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