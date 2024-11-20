"use server";

import { contactSchema } from "../zodschema/zodschema";
import { contactSchemaT, docDescriptionSchemaT, getContactByPageT } from "../models/models";
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
import { convertData } from "../utils/validateType.utils";
import { getObjectByName } from "./rights.controller";
import { getDocs, uploadDocument } from "./document.controller";
import { getScreenDescription } from "./object.controller";
import { getRegionalSetting, getRegionalSettings } from "./config.controller";

export async function createContactsBatch(data: any) {
  const errorMap = new Map();

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
        errorMap.set(contact, {
          message: "Contact data is null or undefined.",
        });
      } else {
        // const adjustedContact = await convertData(contactSchema<T>, contact);
        const adjustedContact = await convertData<contactSchemaT>(
          contactSchema,
          contact
        );

        if (
          adjustedContact.status === 0 &&
          adjustedContact.validateErrors?.validateErrorStatus != 0
        ) {
          const errorDetails = adjustedContact.extractedErrors?.map(
            (error: any) => {
              if (error !== undefined) {
                return {
                  path: error.path[0],
                  message: error.path[0] + " field is missing!",
                };
              }
            }
          );

          errorMap.set(contact, errorDetails);
        } else if (adjustedContact.validateErrors?.validateErrorStatus == 0) {
          const errorDetails = adjustedContact.validateErrors.errors.map(
            (err) => {
              const result = { message: err };
              return result;
            }
          );
          errorMap.set(contact, errorDetails);
        } else {
          const result = await createContact(adjustedContact.adjustedData,[]);

          if (!result.status) {
            const errorDetails = result.data.map(
              (error: { path: string; message: string }) => ({
                path: error.path,
                message: error.message,
              })
            );

            errorMap.set(contact, errorDetails);
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

export async function createContact(data: contactSchemaT,docData : docDescriptionSchemaT[]) {
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
          const objectDetails = await getObjectByName("Contact");
          await uploadDocument(docData,dbResult[1][0].id,objectDetails[0].object_id);
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

export async function updateContact(data: contactSchemaT, docData : docDescriptionSchemaT[]) {
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
          const objectDetails = await getObjectByName("Contact");
          await uploadDocument(docData,dbResult[1][0].id,objectDetails[0].object_id);
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
      const rights={};
      const config_data=await getRegionalSettings();
      const desc = await getScreenDescription(5,1);
      if(id){
        const contactDetails = await getContactDetailsById(session.user.dbInfo.dbName, id);
        if(contactDetails?.length>0){
          const objectDetails = await getObjectByName("Contact");
          const docData = await getDocs(id,objectDetails[0].object_id);
        if (contactDetails.length > 0 && docData.length > 0) {
          contactDetails[0].docData = docData;
        } else {
          contactDetails[0].docData = [];
        }
      }
      const result = [
        desc,
        contactDetails[0],
        rights,
        config_data,
        session
      ]
        return[
          result
        ]
      }
      const result=[
        desc,
        rights,
        config_data,
        session
      ]
      return[
        result
      ]
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
