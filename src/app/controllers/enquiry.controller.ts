'use server'
import { createEnquiryDB } from '../services/enquiry.service';
import { getSession } from '../services/session.service';
import { enquiryHeaderSchemaT, enquiryLedgerSchemaT } from '@/app/models/models';
import { enquiryHeaderSchema, enquiryLedgerSchema } from '@/app/zodschema/zodschema';

export async function createEnquiry(enqData: { head: enquiryHeaderSchemaT, ledger:enquiryLedgerSchemaT } ) {
  let result;
    try {
    const session = await getSession();
    if (session) {
  
      const headParsed = enquiryHeaderSchema.safeParse(enqData.head);
      const ledgerParsed = enquiryLedgerSchema.safeParse(enqData.ledger)
      if(headParsed.success && ledgerParsed.success) {
        const dbResult = await createEnquiryDB(session, enqData);
        if (dbResult.length >0 ) {
         result = {status: true, data:dbResult};
        } else {
          result = {status: false, data: [{path:["form"], message:"Error: Error saving record"}] };
        }
      } else {
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = {status: false, data: parsed.error.issues };

      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e) {
    console.log(e);
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}


