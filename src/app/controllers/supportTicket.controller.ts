"use server";
import dayjs from "dayjs";
import {
  docDescriptionSchemaT,
  enquiryDataSchemaT,
  supportProductSchemaT,
  supportTicketSchemaT,
  suppportProductArraySchemaT,
} from "../models/models";
import { getSession } from "../services/session.service";
import {
  createSupportTicketDB,
  delSupportDataByIdDb,
  getHeaderDataAction,
  getLedgerDataAction,
  getProductDataAction,
  getSupportDataByPageDb,
  getSupportDataCount,
  updateSupportDataDb,
} from "../services/supportTicket.service";
import { logger } from "../utils/logger.utils";
import {
  enquiryDataSchema,
  supportProductArraySchema,
  supportTicketSchema,
} from "../zodschema/zodschema";
import { uploadDocument } from "./document.controller";
import { getObjectByName } from "./rights.controller";
import { adjustToLocal } from "../utils/utcToLocal";
import { bigIntToNum } from "../utils/db/types";

export async function createSupportTicket({
  supportData,
  productData,
  docData
}: {
  supportData: supportTicketSchemaT;
  productData: suppportProductArraySchemaT;
  docData : docDescriptionSchemaT[]
}) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const updatedSupportData = {
        ...supportData,
        status_version: 0,
        allocated_to_id: 0,
        allocated_to: "",
        ticket_tran_type: 1,
        active: 1,
      };
      const supportDataParsed =
        supportTicketSchema.safeParse(updatedSupportData);
      const productParsed = supportProductArraySchema.safeParse(productData);

      if (supportDataParsed.success && productParsed.success) {
        const dbResult = await createSupportTicketDB(
          session,
          updatedSupportData,
          JSON.stringify(productData)
        );
        if (dbResult?.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
          const objectDetails = await getObjectByName("Support");
          await uploadDocument(docData,dbResult[1][0].id,objectDetails[0].object_id);
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
        let ticketIssue: any[] = [];
        let productIssue: any[] = [];
        if (!supportDataParsed.success) {
          ticketIssue = supportDataParsed.error.issues;
        }
        if (!productParsed.success) {
          productIssue = productParsed.error.issues;
        }
        result = {
          status: false,
          data: [
            { ticketDataIssue: ticketIssue.length > 0 ? ticketIssue : null },
            { productIssue: productIssue.length > 0 ? productIssue : null },
          ],
        };
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




export async function getSupportDataById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      let headerData = await getHeaderDataAction(session, id);
      let ledgerData = await getLedgerDataAction(session, id);
      const productData = await getProductDataAction(session, id);
      
      let suggested_action_remark = `${ledgerData[0].created_by_name} ; ${adjustToLocal(headerData[0].created_on).toDate()} ; ${ledgerData[0].suggested_action_remark} \n`;

      for (let i = 1; i < ledgerData.length; i++) {
        if (ledgerData[i].suggested_action_remark) {
          suggested_action_remark += `${ledgerData[i].modified_by_name} ; ${adjustToLocal(ledgerData[i].modified_on).toDate()} ; ${ledgerData[i].suggested_action_remark} \n`;
        }
      }
      ledgerData = ledgerData[ledgerData.length - 1];

      ledgerData.suggested_action_remark = suggested_action_remark;
      headerData = headerData[0];

      return { headerData, ledgerData, productData };
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function updateSupportData(
  data: supportTicketSchemaT,
  productData: suppportProductArraySchemaT
) {
  try {
    let result;
    const session = await getSession();
    if (session?.user.dbInfo) {
      const supportDataParsed = supportTicketSchema.safeParse(data);
      const productParsed = supportProductArraySchema.safeParse(productData);
      if (supportDataParsed.success && productParsed.success) {
        const dbResult = await updateSupportDataDb(
          session,
          data,
          JSON.stringify(productData)
        );
        if (dbResult?.length > 0 ) {
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
        let ticketIssue: any[] = [];
        let productIssue: any[] = [];
        if (!supportDataParsed.success) {
          ticketIssue = supportDataParsed.error.issues;
        }
        if (!productParsed.success) {
          productIssue = productParsed.error.issues;
        }
        result = {
          status: false,
          data: [
            { ticketDataIssue: ticketIssue.length > 0 ? ticketIssue : null },
            { productIssue: productIssue.length > 0 ? productIssue : null },
          ],
        };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (error) {
    logger.error(error);
  }
}

export async function getSupportDataByPage(
  page: number,
  filter: string | undefined,
  limit: number
){
  let result={
    status: false,
    data: {} ,
    count: 0,
    error: {},
  };

  try {
    const session = await getSession();
    if(session?.user.dbInfo){
      const conts= await getSupportDataByPageDb(session,
        page as number,
        filter,
        limit as number
  )
  console.log("conts",conts);
  
  const rowCount = await getSupportDataCount(
    session.user.dbInfo.dbName as string,
    filter
  );
 result = {
    status: true,
    data: conts.map(bigIntToNum) ,
    count: Number(rowCount[0]["rowCount"]),
    error: {},
  };

    }
  } catch (error) {
    let err = "Executive Admin, E-Code:369";

    result = {
      ...result,
      status: false,
      data: {} ,
      error: err,
    };
  }
  return result
}

export async function delSupportDataById(ticketId: number) { 
  let result;
  try {
    const session= await getSession();
    if(session?.user.dbInfo){
       result = await delSupportDataByIdDb(session, ticketId);
      
    }
    return "Record Deleted";
    
  } catch (error) {
    console.log(error);
    
  }

}
