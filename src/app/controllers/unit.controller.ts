"use server";

import * as zs from "../zodschema/zodschema";
import {
  createUnitDB,
  Pagination,
  getUnitCount,
} from "../services/unit.service"
import { getSession } from "../services/session.service";
import { getUnitList, fetchUnitById } from "@/app/services/unit.service";
import * as mdl from "../models/models";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";

export async function createUnit(data: mdl.unitSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.UnitSchema.safeParse(data);

      if (parsed.success) {
        const dbResult = await createUnitDB(session, data as mdl.unitSchemaT);
        if (dbResult.length > 0 && dbResult[0][0].error === 0) {
          result = { status: true, data: dbResult[1] };
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
 * @param searchString partial string for unit name
 * @returns
 */
export async function getUnit(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getUnitList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

/**
 *
 * @param Id id of the unit to be searched
 * @returns
 */
export async function getUnitById(id: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchUnitById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getUnits(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getUnit = {
    status: false,
    data: {} as mdl.getUnitT,
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const conts = await Pagination(
        appSession.user.dbInfo.dbName as string,
        page as number,
        filter,
        limit as number
      );
      const rowCount = await getUnitCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getUnit = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.getUnitT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "unit Admin, E-Code:369";

    getUnit = {
      ...getUnit,
      status: false,
      data: {} as mdl.getUnitT,
      error: err,
    };
  }
  return getUnit;
}

export async function getUnitData(id: string) {
  let getUnit = {
    status: false,
    data: [{}] as mdl.getUnitT,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession) {
      const dep = await fetchUnitById(
        appSession.user.dbInfo.dbName as string,
        id as string
      );

      getUnit = {
        status: true,
        data: dep.map(bigIntToNum) as mdl.getUnitT,
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "unit Admin, E-Code:369";

    getUnit = {
      ...getUnit,
      status: false,
      data: {} as mdl.getUnitT,
      error: err,
    };
  }
  return getUnit;
}
