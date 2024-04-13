'use server'
import { createInquiryDB } from '../services/inquiry.service';
import { getAppSession } from '../services/session.service';
import { getSalesPersonList, 
  getTicketCategoryList, 
  getTicketStageList, 
  getCustomerList,
  getContactPersonList,
  getActionList } from '../services/masters.service';

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
      stage: formData.get("stage") as string,
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


export async function getIquiryPageData() {
  try {
    const appSession = await getAppSession();
    if (appSession?.dbSession) {
      const [salesPerson, catList, ticketStage, customer, person, action] = await Promise.all([
        await getSalesPersonList(appSession.dbSession.dbInfo.dbName),
        await getTicketCategoryList(appSession.dbSession.dbInfo.dbName, 1),
        await getTicketStageList(appSession.dbSession.dbInfo.dbName, 1),
        await getCustomerList(appSession.dbSession.dbInfo.dbName),
        await getContactPersonList(appSession.dbSession.dbInfo.dbName, "contact"),
        await getActionList(appSession.dbSession.dbInfo.dbName, "Pre-sales")
      ]);

      const baseData = {
        salesPerson: salesPerson,
        catList: catList,
        ticketStages: ticketStage,
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