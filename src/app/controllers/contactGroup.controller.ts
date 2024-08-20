"use server";

import * as zs from "../zodschema/zodschema";
import { contactGroupSchemaT } from "@/app/models/models";
import {
  getContactGroupList,
  createContactGroupDb,
  getContactGroupDetailsById,
  updateContactGroupDb,
} from "../services/contactGroup.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { logger } from "@/app/utils/logger.utils";

export async function getContactGroup(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getContactGroupList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function createContactGroup(data: contactGroupSchemaT) {
  let result;
  try {
    const session = await getSession();

    if (session) {
      const parsed = zs.contactGroupSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await createContactGroupDb(
          session,
          data as contactGroupSchemaT
        );

        // if (dbResult.length > 0) {
        //   result = { status: true, data: dbResult };
        // } else {
        //   result = {
        //     status: false,
        //     data: [{ path: ["form"], message: "Error: Error saving record" }],
        //   };
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];

          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: error.error_path,
              message: error.error_text,
            });
          });
          result = { status: false, data: errorState };
        }
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

export async function updateContactGroup(data: contactGroupSchemaT) {
  let result;
  try {
    const session = await getSession();

    if (session) {
      const parsed = zs.contactGroupSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateContactGroupDb(
          session,
          data as contactGroupSchemaT
        );
        // console.log(dbResult);

        // if (dbResult.length > 0 && dbResult[0][0].error === 0) {
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];

          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: error.error_path,
              message: error.error_text,
            });
          });
          result = { status: false, data: errorState };
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
    console.log(e);
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
 * @param Id id of the contact to be searched
 * @returns
 */
export async function getContactGroupById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getContactGroupDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}
