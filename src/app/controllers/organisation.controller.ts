"use server";

import * as zs from "../zodschema/zodschema";
import * as zm from "../models/models";
import {
  createOrganisationDB,
  getOrganisationCount,
  getOrganisationDetailsById,
  Pagination,
  updateOrganisationDB,getOrgsList,getOrgsCount
} from "../services/organisation.service";
import { getSession } from "../services/session.service";
import { bigIntToNum } from "../utils/db/types";
import { getOrganisationList } from "@/app/services/organisation.service";
import { SqlError } from "mariadb";
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function createOrganisation(data: zm.organisationSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.organisationSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createOrganisationDB(
          session,
          data as zm.organisationSchemaT
        );

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

export async function updateOrganisation(data: zm.organisationSchemaT) {
  let result;
  try {
    const session = await getSession();
    if (session) {
      const parsed = zs.organisationSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateOrganisationDB(
          session,
          data as zm.organisationSchemaT
        );
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
 * @param searchString partial string for organisation name
 * @returns
 */
export async function getOrganisation(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getOrganisationList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getOrganisationById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getOrganisationDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getOrganisations(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getOrg = {
    status: false,
    data: {} as mdl.organisationSchemaT,
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
      const rowCount = await getOrganisationCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getOrg = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.organisationSchemaT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {

    let err = "Organisation Admin, E-Code:369";

    getOrg = {
      ...getOrg,
      status: false,
      data: {} as mdl.organisationSchemaT,
      error: err,
    };
  }
  return getOrg;
}
