"use server";

import { contactSchema } from "../zodschema/zodschema";
import { contactSchemaT, getContactByPageT } from "../models/models";
import {
  createContactDB,
  DeleteContactList,
  getContactByPageDb,
  getContCount,
  updateContactDB,
  delContactByIdDB,
} from "../services/contact.service";
import { getSession } from "../services/session.service";
import {
  getContactList,
  getContactDetailsById,
} from "@/app/services/contact.service";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";
import { modifyPhone } from "../utils/phoneUtils";

function validateAndAdjustData(schema: any, data: any) {
  const result = schema.safeParse(data);

  if (!result.success) {
    const adjustedData = { ...data };
    const errors = result.error;
    let check = false;

    const extractedErrors = errors.issues.map((error: any) => {
      if (
        error.received === "undefined" &&
        error.message.includes("Required")
      ) {
        check = true;
        return {
          path: error.path,
          message: error.message,
        };
      }
    });

    if (check) {
      return { status: 0, extractedErrors: extractedErrors };
    } else {
      for (const issue of result.error.issues) {
        const key = issue.path[0];
        const expectedType = issue.expected;

        switch (expectedType) {
          case "string":
            if (typeof adjustedData[key] !== "string") {
              adjustedData[key] = String(adjustedData[key]) || "";
            }
            break;

          case "number":
            if (typeof adjustedData[key] === "string") {
              adjustedData[key] = parseFloat(adjustedData[key] as string) || 0;
            } else {
              adjustedData[key] = Number(adjustedData[key]) || 0;
            }
            break;

          case "date":
            if (typeof adjustedData[key] === "string") {
              adjustedData[key] =
                new Date(adjustedData[key] as string) || new Date();
            } else if (!(adjustedData[key] instanceof Date)) {
              adjustedData[key] = new Date();
            }
            break;

          case "boolean":
            if (typeof adjustedData[key] !== "boolean") {
              adjustedData[key] = Boolean(adjustedData[key]);
            }
            break;

          case "undefined":
            if (typeof adjustedData[key] !== "undefined") {
              adjustedData[key] = undefined;
            }
            break;

          case "symbol":
            if (typeof adjustedData[key] !== "symbol") {
              adjustedData[key] = Symbol();
            }
            break;

          case "object":
            if (
              typeof adjustedData[key] !== "object" ||
              adjustedData[key] === null
            ) {
              adjustedData[key] = {};
            }
            break;

          case "function":
            if (typeof adjustedData[key] !== "function") {
              adjustedData[key] = function () {};
            }
            break;

          case "bigint":
            if (typeof adjustedData[key] === "string") {
              adjustedData[key] = BigInt(adjustedData[key]);
            } else {
              adjustedData[key] = BigInt(0);
            }
            break;
        }
      }
    }

    return { status: 1, adjustedData };
  }

  return { status: 1, data: result.data };
}

export async function createContactsBatch(data: contactSchemaT[]) {
  const errorMap = new Map<string, { path: string; message: string }[]>();

  try {
    if (!Array.isArray(data) || data.length === 0) {
      return {
        status: false,
        data: { error: "Input data is empty or not an array." },
      };
    }

    for (let i = 0; i < data.length; i++) {
      const contact = data[i];

      if (contact === null || contact === undefined) {
        errorMap.set(`contact_${i}`, [
          { path: "contact", message: "Contact data is null or undefined." },
        ]);
      } else {
        const adjustedContact = await validateAndAdjustData(
          contactSchema,
          contact
        );

        if (adjustedContact.status === 0) {
          const errorDetails = adjustedContact.extractedErrors.map(
            (error: any) => {
              if (error !== undefined) {
                const err = error.path.map((p: string) => {
                  return { path: p, message: error.message };
                });
                return err;
              }
            }
          );

          errorMap.set(`contact_${i}`, errorDetails);
        } else {
          const result = await createContact(adjustedContact.adjustedData);

          if (!result.status) {
            const errorDetails = result.data.map(
              (error: { path: string; message: string }) => ({
                path: error.path,
                message: error.message,
              })
            );

            // errorMap.set(`contact_${i}`, errorDetails);
            errorMap.set("contact", errorDetails);
          }
        }
      }
    }

    return {
      status: errorMap.size === 0 ? true : false,
      data: errorMap,
    };
  } catch (e) {
    console.log("Error in batch processing:", e);
    return {
      status: false,
      data: errorMap,
    };
  }
}

export async function createContact(data: contactSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      data.mobile = modifyPhone(data.mobile);
      data.whatsapp = modifyPhone(data.whatsapp);

      const parsed = contactSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createContactDB(session, data as contactSchemaT);
        if (dbResult.length > 0 && dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          result = {
            status: false,
            data: errorState,
          };
        }
      } else {
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e: any) {
    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      result = {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exist" }],
      };
      return result;
    }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

export async function updateContact(data: contactSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      data.mobile = modifyPhone(data.mobile);
      data.whatsapp = modifyPhone(data.whatsapp);

      const parsed = contactSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateContactDB(session, data as contactSchemaT);
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          result = {
            status: false,
            data: errorState,
          };
        }
      } else {
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e: any) {
    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      result = {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exist" }],
      };
      return result;
    }
  }
  result = {
    status: false,
    data: [{ path: ["form"], message: "Error: Unknown Error" }],
  };
  return result;
}

/**
 *
 * @param searchString partial string for contact name
 * @returns
 */
export async function getContact(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getContactList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param Id id of the contact to be searched
 * @returns
 */
export async function getContactById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getContactDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

// For Deleting Contact
export async function DeleteContact(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();

    if (session?.user.dbInfo) {
      const result = await DeleteContactList(session.user.dbInfo.dbName, id);

      if ((result.affectedRows = 1)) {
        errorResult = { status: true, error: {} };
      } else if ((result.affectedRows = 0)) {
        errorResult = {
          ...errorResult,
          error: "Record Not Found",
        };
      }
    }
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}

export async function getContactByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getContactByPage = {
    status: false,
    data: {} as getContactByPageT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getContactByPageDb(
        // appSession.dbSession?.dbInfo.dbName as string,
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getContCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getContactByPage = {
        status: true,
        data: conts.map(bigIntToNum) as getContactByPageT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Contact Admin, E-Code:369";

    getContactByPage = {
      ...getContactByPage,
      status: false,
      data: {} as getContactByPageT,
      error: err,
    };
  }
  return getContactByPage;
}

export async function delContactById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await delContactByIdDB(session.user.dbInfo.dbName, id);

      if ((result.affectedRows = 1)) {
        errorResult = { status: true, error: {} };
      } else if ((result.affectedRows = 0)) {
        errorResult = {
          ...errorResult,
          error: "Record Not Found",
        };
      }
    }
  } catch (error: any) {
    throw error;
    errorResult = { status: false, error: error };
  }
  return errorResult;
}
