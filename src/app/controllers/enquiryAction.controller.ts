"use server";

import * as zs from "../zodschema/zodschema";
import {
  getEnquiryActionList,
  createEnquiryActionDb,
  getActionDetailsById,
  updateEnquiryActionDb,
} from "../services/enquiryAction.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";

export async function getEnquiryAction(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquiryActionList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getActionById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getActionDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param formData
 * @returns object with status, record if success and error
 */
export async function createEnquiryAction(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createEnquiryActionDb(session, data);
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [{ path: ["form"], message: "Error: Error saving record" }],
          };
        }
      } else {
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = { status: false, data: parsed.error.issues };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    return result;
  } catch (e) {
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

export async function updateEnquiryAction(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: formData.get("name") as string,
      // };

      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateEnquiryActionDb(session, data);

        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          result = {
            status: false,
            data: [{ path: ["form"], message: "Error: Error saving record" }],
          };
        }
      } else {
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = { status: false, data: parsed.error.issues };
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
    }
    console.log(result);

    return result;
  } catch (e) {
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
