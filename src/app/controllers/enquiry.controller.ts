"use server";
import {
  createEnquiryDB,
  getHeaderDataAction,
  getProductDataAction,
  getLedgerDataAction,
  getConfigDataDB,
  getLoggedInUserDetailsDB,
} from "../services/enquiry.service";
import { getSession } from "../services/session.service";
import {
  enquiryDataSchemaT,
  enquiryProductSchemaT,
  enquiryLedgerSchemaT,
  docDescriptionSchemaT,
} from "@/app/models/models";
import {
  enquiryDataSchema,
  enquiryLedgerSchema,
  productToListFormArraySchema,
} from "@/app/zodschema/zodschema";
import { logger } from "@/app/utils/logger.utils";
import { getObjectByName } from "./rights.controller";
import { uploadDocument } from "./document.controller";

export async function createEnquiry({
  enqData,
  product,
  docData,
}: {
  enqData: enquiryDataSchemaT;
  product: enquiryProductSchemaT[];
  docData: docDescriptionSchemaT[]
}) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const updatedEnqData = {
        ...enqData,
        status_version: 0,
        allocated_to_id: 0,
        allocated_to: "",
        enquiry_tran_type: 1,
        active: 1,
      };
      const enqDataParsed = enquiryDataSchema.safeParse(updatedEnqData);
      const productParsed = productToListFormArraySchema.safeParse(product);
      if (enqDataParsed.success && productParsed.success) {
        const enqActionData = {
          headerLedger: updatedEnqData,
          product: JSON.stringify(product),
        };

        const dbResult = await createEnquiryDB(session, enqActionData);
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
          const objectDetails = await getObjectByName("Enquiry");
          await uploadDocument(
            docData,
            dbResult[1][0].id,
            objectDetails[0].object_id
          );
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
        let enqIssue: any[] = [];
        let productIssue: any[] = [];
        if (!enqDataParsed.success) {
          enqIssue = enqDataParsed.error.issues;
        }
        if (!productParsed.success) {
          productIssue = productParsed.error.issues;
        }
        result = {
          status: false,
          data: [
            { enqDataIssue: enqIssue.length > 0 ? enqIssue : null },
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

export async function getConfigData() {
  let result;

  try {
    const session = await getSession();
    if (session) {
      const dbResult = await getConfigDataDB(session.user.dbInfo.dbName);
      if (dbResult) {
        result = dbResult;
      }
    }
    return result;
  } catch (e) {
    logger.error(e);
  }
}
export async function getLoggedInUserDetails() {
  let result;

  try {
    const session = await getSession();
    if (session) {
      const dbResult = await getLoggedInUserDetailsDB(
        session.user.dbInfo.dbName,
        session.user.userId
      );
      if (dbResult) {
        result = dbResult[0];
      }
    }
    return result;
  } catch (e) {
    logger.error(e);
  }
}

export async function getEnquiryById(id: number | undefined) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const headerData = await getHeaderDataAction(session, 7);
      const ledgerData = await getLedgerDataAction(session, 7);
      const productData = await getProductDataAction(session, 7);

      return { headerData, ledgerData, productData };
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function updateEnquiryById({
  id,
  ledgerData,
}: {
  id: number;
  ledgerData: enquiryLedgerSchemaT;
}) {
  try {
    const session = await getSession();
    if (session) {
      const updateDataParsed = enquiryLedgerSchema.safeParse(ledgerData);
    }
  } catch (error) {
    logger.error(error);
  }
}