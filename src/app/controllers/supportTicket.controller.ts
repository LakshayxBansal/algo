"use server";
import {
  enquiryDataSchemaT,
  supportProductSchemaT,
  supportTicketSchemaT,
  suppportProductArraySchemaT,
} from "../models/models";
import { getSession } from "../services/session.service";
import { createSupportTicketDB } from "../services/supportTicket.service";
import { logger } from "../utils/logger.utils";
import {
  enquiryDataSchema,
  supportProductArraySchema,
  supportTicketSchema,
} from "../zodschema/zodschema";
import { uploadDocument } from "./document.controller";
import { getObjectByName } from "./rights.controller";

export async function createSupportTicket({
  supportData,
  productData,
  docData
}: {
  supportData: supportTicketSchemaT;
  productData: suppportProductArraySchemaT;
  docData : any
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
