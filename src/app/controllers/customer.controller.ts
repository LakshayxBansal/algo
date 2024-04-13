'use server'
import { createCustomerDB } from '../services/customer.service';
import { getAppSession } from '../services/session.service';

export async function createCustomer(formData: FormData ) {
  try {
    const appSession = await getAppSession();

    const companyData = {
      name: formData.get("company") as string,
      add1: formData.get("add1") as string,
      add2: formData.get("add2") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      pin: formData.get("pin") as string
    }
    if (appSession) {
      return createCustomerDB(appSession.dbSession?.dbInfo.dbName as string, companyData);
    }
  } catch (e) {
    console.log(e);
  }
}


