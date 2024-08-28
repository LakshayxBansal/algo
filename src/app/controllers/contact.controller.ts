"use server";

import { contactSchema } from "../zodschema/zodschema";
import { contactSchemaT, getContsT } from "../models/models";
import {
  createContactDB,
  DeleteContactList,
  getContactList2,
  getContCount,
  updateContactDB,
} from "../services/contact.service";
import { getSession } from "../services/session.service";
import {
  getContactList,
  getContactDetailsById,
} from "@/app/services/contact.service";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";
import { modifyPhone } from "../utils/phoneUtils";
import * as mdl from "../models/models";

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
  try {
    const session = await getSession();

    if (session?.user.dbInfo) {
      return DeleteContactList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getConts(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getConts = {
    status: false,
    data: {} as getContsT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getContactList2(
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
      getConts = {
        status: true,
        data: conts.map(bigIntToNum) as getContsT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "Contact Admin, E-Code:369";

    getConts = {
      ...getConts,
      status: false,
      data: {} as getContsT,
      error: err,
    };
  }
  return getConts;
}
