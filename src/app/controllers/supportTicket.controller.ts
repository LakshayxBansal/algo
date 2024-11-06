"use server";
import {
  enquiryDataSchemaT,
  supportProductSchemaT,
  supportTicketSchemaT,
  suppportProductArraySchemaT,
} from "../models/models";
import { getSession } from "../services/session.service";
import {
  createSupportTicketDB,
  getHeaderDataAction,
  getLedgerDataAction,
  getProductDataAction,
  updateSupportDataDb,
} from "../services/supportTicket.service";
import { logger } from "../utils/logger.utils";
import {
  enquiryDataSchema,
  supportProductArraySchema,
  supportTicketSchema,
} from "../zodschema/zodschema";

export async function createSupportTicket({
  supportData,
  productData,
}: {
  supportData: supportTicketSchemaT;
  productData: suppportProductArraySchemaT;
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
      ledgerData = ledgerData[ledgerData.length - 1];
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
