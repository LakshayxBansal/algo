'use server'
import { createEnquiryDB } from '../services/inquiry.service';
import { getSession } from '../services/session.service';
import { getExecutiveList, 
  getEnquiryCategoryList, 
  getOrganizationList,
  getContactList,
  getEnquiryActionList } from '../services/masters.service';

export async function createInquiry(formData: FormData ) {
  try {
    const session = await getSession();

    if (session) {
      const inquiryData = {
        desc: formData.get("desc") as string,
        customer: formData.get("customer"),
        contactPerson: formData.get("contactperson"),
        salesPerson: formData.get("salesPerson") as string,
        category: formData.get("category") as string,
        closuredate: formData.get("expclosuredate") as string,
        username: session.user.email,
        notes: formData.get("notes") as string,
        nextaction: formData.get("nextaction"),
        nextactiondate: formData.get("nextactiondate"),
      }
  
      console.log(inquiryData);
    }

    //return createInquiryDB(crmDb, inquiryData);
  } catch (e) {
    console.log(e);
  }
}


export async function getEquiryPageData() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo.dbName) {
      const [salesPerson, catList, customer, person, action] = await Promise.all([
        await getExecutiveList(session.user.dbInfo.dbName, "Pre-Sales"),
        await getEnquiryCategoryList(session.user.dbInfo.dbName),
        await getOrganizationList(session.user.dbInfo.dbName, ""),
        await getContactList(session.user.dbInfo.dbName, ""),
        await getEnquiryActionList(session.user.dbInfo.dbName)
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