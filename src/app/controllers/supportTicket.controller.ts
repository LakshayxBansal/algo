"use server";
import dayjs from "dayjs";
import {
  docDescriptionSchemaT,
  enquiryDataSchemaT,
  supportLedgerSchemaT,
  supportProductSchemaT,
  supportTicketSchemaT,
  suppportProductArraySchemaT,
} from "../models/models";
import { getSession } from "../services/session.service";
import {
  createSupportTicketDB,
  delSupportDataByIdDb,
  getHeaderDataAction,
  getLastVoucherNumberSupportDb,
  getLedgerDataAction,
  getProductDataAction,
  getSupportDataByPageDb,
  getSupportDataCount,
  getSupportTicketDescriptionDb,
  getSupportTicketsByExecutiveIdDb,
  updateSupportDataDb,
  updateSupportTicketStatusDb,
} from "../services/supportTicket.service";
import { logger } from "../utils/logger.utils";
import {
  enquiryDataSchema,
  supportLedgerSchema,
  supportProductArraySchema,
  supportTicketSchema,
} from "../zodschema/zodschema";
import { getDocs, uploadDocument } from "./document.controller";
import { getObjectByName } from "./rights.controller";
import { adjustToLocal } from "../utils/utcToLocal";
import { bigIntToNum } from "../utils/db/types";
import { sendNotificationToTopic } from "../services/notification.service";
import { SUPPORT_ID } from "@/app/utils/consts.utils";

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
        ticket_tran_type: 1,
        active: 1,
      };
      const supportDataParsed =supportTicketSchema.safeParse(updatedSupportData);
      const productParsed = supportProductArraySchema.safeParse(productData);

      if (supportDataParsed.success && productParsed.success) {
        const supportActionData = {
          headerLedger: updatedSupportData,
          product: JSON.stringify(productData),
        };
      
        const dbResult = await createSupportTicketDB(session,  updatedSupportData,  JSON.stringify(productData));
        if (dbResult[0].length === 0 && dbResult[1].length === 0) {
          result = { status: true, data: dbResult[2] };
          if(supportData.allocated_to_id !== 0){
            const topic = supportData.allocated_to_id!.toString() + '_' + session.user.dbInfo.id.toString();
            sendNotificationToTopic(topic, "Support", "Support ticket allocated", "support");
          }
          await uploadDocument(
            docData,
            dbResult[2][0].id,
            SUPPORT_ID
          );
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          let errorStateForProduct: {
            path: (string | number)[];
            message: string;
          }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          dbResult[1].forEach((error: any) => {
            if (error.error_path.length > 1) {
              errorStateForProduct.push({
                path: [Number(error.error_path[0]) - 1, error.error_path[1]], // Convert first element to number
                message: error.error_text,
              });
            }
          });
          result = {
            status: false,
            data: [
              { ticketDataIssue: errorState.length > 0 ? errorState : null },
              {
                productIssue:
                  errorStateForProduct.length > 0 ? errorStateForProduct : null,
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
      const docData = await getDocs(id,SUPPORT_ID);
      
      // let suggested_action_remark = `${headerData[0].created_by_name} ; ${adjustToLocal(headerData[0].created_on).toDate()} ; ${ledgerData[0].suggested_action_remark} \n`;

      // for (let i = 1; i < ledgerData.length; i++) {
      //   if (ledgerData[i].suggested_action_remark) {
      //     suggested_action_remark += `${ledgerData[i].modified_by_name} ; ${adjustToLocal(ledgerData[i].modified_on).toDate()} ; ${ledgerData[i].suggested_action_remark} \n`;
      //   }
      // }
      // ledgerData = ledgerData[ledgerData.length - 1];

      // ledgerData.suggested_action_remark = suggested_action_remark;
      // headerData = headerData[0];

      return { headerData, ledgerData, productData, docData };
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function updateSupportData(
  data: supportTicketSchemaT,
  productData: suppportProductArraySchemaT,
  docData : docDescriptionSchemaT[]
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
        if (dbResult[0].length === 0 && dbResult[1].length === 0) {
          result = { status: true, data: dbResult[2] };
          await uploadDocument(
            docData,
            dbResult[2][0].id,
            SUPPORT_ID
          );
          if(data.allocated_to_id !== 0){
            const topic = data.allocated_to_id!.toString() + '_' + session.user.dbInfo.id.toString();
            sendNotificationToTopic(topic, "Support", "Support Updated", "support");
          }
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          let errorStateForProduct: {
            path: (string | number)[];
            message: string;
          }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          dbResult[1].forEach((error: any) => {
            if (error.error_path.length > 1) {
              errorStateForProduct.push({
                path: [Number(error.error_path[0]) - 1, error.error_path[1]], // Convert first element to number
                message: error.error_text,
              });
            }
          });
          result = {
            status: false,
            data: [
              { ticketDataIssue: errorState.length > 0 ? errorState : null },
              {
                productIssue:
                  errorStateForProduct.length > 0 ? errorStateForProduct : null,
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
    data: [] as supportTicketSchemaT[],
    count: 0,
    error: {},
  };

  try {
    const session = await getSession();
    if(session?.user.dbInfo){
      const dbData= await getSupportDataByPageDb(session,
        page as number,
        filter,
        limit as number
  )

  
  const rowCount = await getSupportDataCount(
    session.user.dbInfo.dbName as string,
    filter
  );
 result = {
    status: true,
    data: dbData.map(bigIntToNum) as supportTicketSchemaT[],
    count: Number(rowCount[0]["rowCount"]),
    error: {},
  };

    }
  } catch (error) {
    let err = "Executive Admin, E-Code:369";

    result = {
      ...result,
      status: false,
      data: [] as supportTicketSchemaT[],
      error: err,
    };
  }
  return result
}

export async function delSupportDataById(ticketId: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delSupportDataByIdDb(session, ticketId);
      if (dbResult[0][0].error === 0) {
        result = { status: true };
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
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (error: any) {
    throw error;
  }
}


export async function getSupportTicketDescription(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getSupportTicketDescriptionDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getLastVoucherNumberSupport() {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await getLastVoucherNumberSupportDb(session);
      result = { status: true, data: dbResult };
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (error: any) {
    throw error;
  }
}

export async function getSupportTicketsByExecutiveId() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await getSupportTicketsByExecutiveIdDb(session.user.dbInfo.dbName, session.user.userId);
      return result;
    }
  } catch (error) {
    throw error;
  }
}

export async function updateSupportTicketStatus(
  ledgerData: supportLedgerSchemaT
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {      
      const supportDataParsed = supportLedgerSchema.safeParse(ledgerData);

      if (supportDataParsed.success) {
        const ledgerRes = updateSupportTicketStatusDb(
          session,
          ledgerData as supportLedgerSchemaT
        );
        return {status: true};
      }
      else{
        console.log(supportDataParsed.error.issues);
        
        return {status: false};
      }
    }
  } catch (error) {
    logger.error(error);
  }
}