"use server";

import * as zs from "../zodschema/zodschema";
import { currencySchemaT } from "@/app/models/models";
import { getContactGroupList } from "../services/contactGroup.service";
import { getSession } from "../services/session.service";
import { SqlError } from "mariadb";
import {
  createCurrencyDb,
  delCurrencyByIdDB,
  getCurrencyByPageDb,
  getCurrencyCount,
  getCurrencyDetailsById,
  updateCurrencyDb,
} from "../services/currency.services";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

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
 * @param Id id of the currency to be searched
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

export async function delCurrencyById(id: number) {
  let errorResult = { status: false, error: {} };
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const result = await delCurrencyByIdDB(session.user.dbInfo.dbName, id);

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

export async function getCurrencyByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getCurrency = {
    status: false,
    data: {} as mdl.currencySchemaT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await getCurrencyByPageDb(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );

      const rowCount = await getCurrencyCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getCurrency = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.currencySchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Currency Admin, E-Code:369";

    getCurrency = {
      ...getCurrency,
      status: false,
      data: {} as mdl.currencySchemaT,
      error: err,
    };
  }
  return getCurrency;
}
