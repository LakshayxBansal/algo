"use server";
import {
  createEnquiryDB,
  getHeaderDataAction,
  getProductDataAction,
  getLedgerDataAction,
  getConfigDataDB,
  getLoggedInUserDetailsDB,
  createEnquiryLedgerDB,
  getEnquiryDescriptionDb,
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
  docData: docDescriptionSchemaT[];
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
        if (dbResult[0].length === 0 && dbResult[1].length === 0) {
          result = { status: true, data: dbResult[2] };
          const objectDetails = await getObjectByName("Enquiry");
          await uploadDocument(
            docData,
            dbResult[2][0].id,
            objectDetails[0].object_id
          );
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          let errorStateForProduct: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          dbResult[1].forEach((error: any) => {
            if (error.error_path.length > 1) {
              errorStateForProduct.push({
                path: [Number(error.error_path[0])-1, error.error_path[1]], // Convert first element to number
                message: error.error_text,
              });
            }
          });
          result = {
            status: false,
            data: [{ enqDataIssue: errorState.length > 0 ? errorState : null },
            { productIssue: errorStateForProduct.length > 0 ? errorStateForProduct : null }],
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
        data: [
          {
            enqDataIssue: [{ path: ["form"], message: "Error: Server Error" }],
          },
        ],
      };
    }
    return result;
  } catch (e) {
    logger.error(e);
  }

  result = {
    status: false,
    data: [
      { enqDataIssue: [{ path: ["form"], message: "Error: Server Error" }] },
    ],
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

export async function createEnquiryLedger(ledgerId: number, statusId: number, subStatusId: number, actionTakenId: number, nextActionId: number, suggestedActionRemark: string, actionTakenRemark: string, closureRemark: string, nextActionDate: String) {
  try {
    const session = await getSession();
    if (session) {
      const ledgerData = {
        id: ledgerId,
        status_id: statusId,
        sub_status_id: subStatusId,
        action_taken_id: actionTakenId,
        next_action_id: nextActionId,
        suggested_action_remark: suggestedActionRemark,
        action_taken_remark: actionTakenRemark,
        closure_remark: closureRemark,
        next_action_date: nextActionDate
      }
      
      const ledgerRes = createEnquiryLedgerDB(session, ledgerData as enquiryLedgerSchemaT);
      return {
        status: true
      }
    }
  } catch (error) {
    logger.error(error);
  }
}


export async function getEnquiryDescription(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquiryDescriptionDb(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}