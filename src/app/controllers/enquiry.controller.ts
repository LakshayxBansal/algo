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
  updateEnquiryDB,
  getEnquiryDataByPageDb,
  getEnquiryDataCount,
  delEnquiryDataByIdDb,
  getLastVoucherNumberEnquiryDb,
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
import { getDocs, uploadDocument } from "./document.controller";
import { bigIntToNum } from "../utils/db/types";
import { ENQUIRY_ID } from "@/app/utils/consts.utils";

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
    if (session?.user.dbInfo) {
      const updatedEnqData = {
        ...enqData,
        status_version: 0,
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
          await uploadDocument(
            docData,
            dbResult[2][0].id,
            ENQUIRY_ID
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
              { enqDataIssue: errorState.length > 0 ? errorState : null },
              {
                productIssue:
                  errorStateForProduct.length > 0 ? errorStateForProduct : null,
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

export async function updateEnquiry({
  enqData,
  product,
  docData
}: {
  enqData: enquiryDataSchemaT;
  product: enquiryProductSchemaT[];
  docData: docDescriptionSchemaT[];
}) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const enqDataParsed = enquiryDataSchema.safeParse(enqData);
      const productParsed = productToListFormArraySchema.safeParse(product);
      if (enqDataParsed.success && productParsed.success) {
        const enqActionData = {
          headerLedger: enqData,
          product: JSON.stringify(product),
        };

        const dbResult = await updateEnquiryDB(session, enqActionData);
        if (dbResult[0].length === 0 && dbResult[1].length === 0) {
          result = { status: true, data: dbResult[2] };
          // const objectDetails = await getObjectByName("Enquiry");
          await uploadDocument(
            docData,
            dbResult[2][0].id,
            ENQUIRY_ID
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
              { enqDataIssue: errorState.length > 0 ? errorState : null },
              {
                productIssue:
                  errorStateForProduct.length > 0 ? errorStateForProduct : null,
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

export async function getConfigData(formName: string) {
  let result;

  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await getConfigDataDB(session.user.dbInfo.dbName,formName);
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
    if (session?.user.dbInfo) {
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

export async function getEnquiryById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const headerData = await getHeaderDataAction(session, id);
      const ledgerData = await getLedgerDataAction(session, id);
      const productData = await getProductDataAction(session, id);
      const docData = await getDocs(id,ENQUIRY_ID);

      return { headerData, ledgerData, productData, docData };
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
    if (session?.user.dbInfo) {
      const updateDataParsed = enquiryLedgerSchema.safeParse(ledgerData);
    }
  } catch (error) {
    logger.error(error);
  }
}

export async function createEnquiryLedger(
  ledgerId: number,
  statusId: number,
  subStatusId: number,
  actionTakenId: number,
  nextActionId: number,
  suggestedActionRemark: string,
  actionTakenRemark: string,
  closureRemark: string,
  nextActionDate: String
) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const ledgerData = {
        id: ledgerId,
        status_id: statusId,
        sub_status_id: subStatusId,
        action_taken_id: actionTakenId,
        next_action_id: nextActionId,
        suggested_action_remark: suggestedActionRemark,
        action_taken_remark: actionTakenRemark,
        closure_remark: closureRemark,
        next_action_date: nextActionDate,
      };

      const ledgerRes = createEnquiryLedgerDB(
        session,
        ledgerData as enquiryLedgerSchemaT
      );
      return {
        status: true,
      };
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


export async function getEnquiryDataByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let result = {
    status: false,
    data: {},
    count: 0,
    error: {},
  };

  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const conts = await getEnquiryDataByPageDb(
        session,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getEnquiryDataCount(
        session.user.dbInfo.dbName as string,
        filter
      );
      result = {
        status: true,
        data: conts.map(bigIntToNum),
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (error) {
    let err = "Executive Admin, E-Code:369";

    result = {
      ...result,
      status: false,
      data: {},
      error: err,
    };
  }
  return result;
}

export async function delEnquiryDataById(enquiryID: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delEnquiryDataByIdDb(session, enquiryID);
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

export async function getLastVoucherNumberEnquiry() {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await getLastVoucherNumberEnquiryDb(session);
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