"use server";

import * as zs from "../zodschema/zodschema";
import {
  getEnquiryCategoryList,
  createEnquiryCategoryDb,
  getCategoryDetailsById,
  updateEnquiryCategoryDb,
} from "../services/enquiryCategory.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import { nameMasterDataT } from "../models/models";

export async function getEnquiryCategory(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquiryCategoryList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getCategoryById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCategoryDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function createEnquiryCategory(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      if (parsed.success) {
        const dbResult = await createEnquiryCategoryDb(session, data);

        if (dbResult.length > 0) {
          result = { status: true, data: dbResult };
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

export async function updateEnquiryCategory(data: nameMasterDataT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.nameMasterData.safeParse(data);
      // console.log(parsed);

      if (parsed.success) {
        let dbResult = await updateEnquiryCategoryDb(
          session,
          data as nameMasterDataT
        );

        // console.log(dbResult);

        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          // console.log(dbResult);
          // console.log(dbResult[1]);

          result = { status: true, data: dbResult[1] };
        } else {
          // console.log(dbResult[0]);
          // console.log(dbResult[1]);
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
