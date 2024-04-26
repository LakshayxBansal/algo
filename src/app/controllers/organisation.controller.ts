'use server'
import { createOrganisationDB } from '../services/organisation.service';
import { getSession } from '../services/session.service';

export async function createOrganisation(formData: FormData ) {
  try {
    const session = await getSession();

    const companyData = {
      name: formData.get("organisation") as string,
      alias: formData.get("alias") as string,
      pan: formData.get("pan") as string,
      gst: formData.get("gst") as string,
      add1: formData.get("add1") as string,
      add2: formData.get("add2") as string,
      add3: formData.get("add3") as string,
      country: formData.get("country") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      pin: formData.get("pin") as string
    }
    if (session) {
      //return createOrganisationDB(session.user.dbInfo.dbName as string, companyData);
    }
  } catch (e) {
    console.log(e);
  }
}


