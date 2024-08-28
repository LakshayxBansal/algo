"use server";

import * as zs from "../zodschema/zodschema";
import { currencySchemaT } from "@/app/models/models";
import { getContactGroupList } from "../services/contactGroup.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import {
  createCurrencyDb,
  getCurrencyDetailsById,
  updateCurrencyDb,
} from "../services/currency.services";

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

export async function createCurrency(data: currencySchemaT) {
  let result;
  try {
    const session = await getSession();

    if (session) {
      const parsed = zs.currencySchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await createCurrencyDb(
          session,
          data as currencySchemaT
        );
        console.log(dbResult);

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

export async function updateCurrency(data: currencySchemaT) {
  let result;
  try {
    const session = await getSession();

    if (session) {
      const parsed = zs.currencySchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateCurrencyDb(
          session,
          data as currencySchemaT
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
export async function getCurrencyById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getCurrencyDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}
