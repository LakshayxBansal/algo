'use server'
import { createCompanyDB, createCompanyInfo, assignUserCompany } from "../services/company.service";

export async function createCompany(formData: FormData, userEmail: string) {
  try {
    const compName = formData.get("company") as string;
    const companyData = {
      name: compName,
      add1: formData.get("add1") as string,
      add2: formData.get("add2") as string,
      state: formData.get("state") as string,
      city: formData.get("city") as string,
      pin: formData.get("pin") as string
    }

    // create dbInfo with hostId
    const dbId = (await createCompanyDB(compName))[0].dbId;
    if (dbId) {
      // create company with dbID
      const coResult = await createCompanyInfo(companyData, dbId);

      if (coResult.length >0){
        // create userCompany with user and companyId
        const userCoResult = assignUserCompany(coResult[0].companyId, userEmail);
      }
    }
  } catch (e) {
    console.log(e);
  }
}


