'use server'
import { createEnquiryDB } from '../services/enquiry.service';
import { getSession } from '../services/session.service';
import { enquiryHeaderSchemaT, enquiryLedgerSchemaT } from '@/app/models/models';
import { enquiryHeaderSchema, enquiryLedgerSchema } from '@/app/zodschema/zodschema';
import {logger} from '@/app/utils/logger.utils';

export async function createEnquiry(enqData: { head: enquiryHeaderSchemaT, ledger:enquiryLedgerSchemaT } ) {
  let result;
    try {
    const session = await getSession();
    if (session) {
  
      const headParsed = enquiryHeaderSchema.safeParse(enqData.head);
      const ledgerParsed = enquiryLedgerSchema.safeParse(enqData.ledger)
      if(headParsed.success && ledgerParsed.success) {
        const dbResult = await createEnquiryDB(session, enqData);
        if (dbResult.length >0 && dbResult[0][0].error === 0) {
         result = {status: true, data:dbResult[1]};
        } else {
          result = {status: false, data: [{path:[dbResult[0][0].error_path], message:dbResult[0][0].error_text}] };
        }
      } else {
        let issues;
        if (!headParsed.success) {
          issues = headParsed.error.issues;
        } else if (!ledgerParsed.success) {
          issues = ledgerParsed.error.issues;
        }
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = {status: false, data: issues };

      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e) {
    logger.error(e);
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}


