'use server'
import { createEnquiryDB } from '../services/inquiry.service';
import { getAppSession } from '../services/session.service';
import { getExecutiveList, 
  getEnquiryCategoryList, 
  getOrganizationList,
  getContactPersonList,
  getEnquiryActionList } from '../services/masters.service';

export async function createInquiry(formData: FormData ) {
  try {
    const appSession = await getAppSession();
    const inquiryData = {
      desc: formData.get("desc") as string,
      customer: formData.get("customer"),
      contactPerson: formData.get("contactperson"),
      salesPerson: formData.get("salesPerson") as string,
      category: formData.get("category") as string,
      closuredate: formData.get("expclosuredate") as string,
      username: appSession?.session.user?.email,
      notes: formData.get("notes") as string,
      nextaction: formData.get("nextaction"),
      nextactiondate: formData.get("nextactiondate"),
    }

    console.log(inquiryData);
    //return createInquiryDB(crmDb, inquiryData);
  } catch (e) {
    console.log(e);
  }
}


export async function getEquiryPageData() {
  try {
    const appSession = await getAppSession();
    if (appSession?.dbSession) {
      const [salesPerson, catList, customer, person, action] = await Promise.all([
        await getExecutiveList(appSession.dbSession.dbInfo.dbName, "Pre-Sales"),
        await getEnquiryCategoryList(appSession.dbSession.dbInfo.dbName),
        await getOrganizationList(appSession.dbSession.dbInfo.dbName),
        await getContactPersonList(appSession.dbSession.dbInfo.dbName),
        await getEnquiryActionList(appSession.dbSession.dbInfo.dbName)
      ]);

      const baseData = {
        salesPerson: salesPerson,
        catList: catList,
        customer: customer,
        person: person,
        action: action,
      };

      return baseData;
    }
  } catch (e) {
    console.log(e);
    throw (e);
  }
}