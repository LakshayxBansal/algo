"use server";
import { createEnquiryDB, getHeaderDataAction, getItemDataAction, getLedgerDataAction, showItemGridDB } from "../services/enquiry.service";
import { getSession } from "../services/session.service";
import {
  enquiryHeaderSchemaT,
  enquiryItemSchemaT,
  enquiryLedgerSchemaT,
} from "@/app/models/models";
import {
  enquiryHeaderSchema,
  enquiryLedgerSchema,
  itemToListFormArraySchema,
  itemToListFormSchema,
} from "@/app/zodschema/zodschema";
import { logger } from "@/app/utils/logger.utils";
import { Session } from "next-auth";

type enqData={
  head: enquiryHeaderSchemaT;
  ledger: enquiryLedgerSchemaT;
  item : enquiryItemSchemaT[]
}

export async function createEnquiry(enqData: {
  head: enquiryHeaderSchemaT;
  ledger: enquiryLedgerSchemaT;
  item : enquiryItemSchemaT[]
}) {
  let result;

  const transformEnqData = (enqData: enqData) => {
    const updatedItems = enqData.item.map(({ item, unit, ...rest }) => rest);
            return {
      ...enqData,
      item: JSON.stringify(updatedItems) 
    };
  };

  try {
    const session = await getSession();
    if (session) {
      const headParsed = enquiryHeaderSchema.safeParse(enqData.head);

      const ledgerParsed = enquiryLedgerSchema.safeParse(enqData.ledger);
      const itemParsed = itemToListFormArraySchema.safeParse(enqData.item)
      if (headParsed.success && ledgerParsed.success && itemParsed.success) {
        
        const updatedEnqData = transformEnqData(enqData);
        
        const dbResult = await createEnquiryDB(session,updatedEnqData );
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [
              {
                path: [dbResult[0][0].error_path],
                message: dbResult[0][0].error_text,
              },
            ],
          };
        }
      } else {
        let issues;
        if (!headParsed.success) {
          issues = headParsed.error.issues;
        } else if (!ledgerParsed.success) {
          issues = ledgerParsed.error.issues;
        }
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = { status: false, data: issues };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
    logger.error(e);
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function showItemGrid() {
  let result;

  try {
    const session = await getSession();
    if (session) {
      const dbResult = await showItemGridDB(session.user.dbInfo.dbName);
      if (dbResult) {
        result = { status: true, config: dbResult[0].config };
      }
    }
    return result;
  } catch (e) {
    logger.error(e);
  }
}


export async function getEnquiryById(id:number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const headerData =await getHeaderDataAction(session , 7);
      const ledgerData= await getLedgerDataAction(session,7);
      const itemData= await getItemDataAction(session , 7);

      return {headerData,ledgerData,itemData};
    }
  } catch (error) {
    throw error;
  }

}
