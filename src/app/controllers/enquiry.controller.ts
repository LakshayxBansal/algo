'use server'
import { createEnquiryDB } from '../services/enquiry.service';
import { getSession } from '../services/session.service';


export async function createEnquiry(formData: FormData ) {
  try {
    const session = await getSession();

    if (session) {
      const enquiryData = {
        desc: formData.get("desc") as string,
        contactPerson: formData.get("contactperson"),
        salesPerson: formData.get("executive") as string,
        category: formData.get("category") as string,
        closuredate: formData.get("expclosuredate") as string,
        username: session.user.email,
        notes: formData.get("notes") as string,
        nextaction: formData.get("nextaction"),
        nextactiondate: formData.get("nextactiondate"),
      }
  
      console.log(enquiryData);
      //return createEnquiryDB(session.user.dbInfo.dbName, enquiryData);
    }


  } catch (e) {
    console.log(e);
  }
}



