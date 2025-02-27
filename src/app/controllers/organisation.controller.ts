"use server";

import * as zs from "../zodschema/zodschema";
import * as zm from "../models/models";
import {
  checkIfUsed,
  createOrganisationDB,
  delOrganisationDetailsById,
  getOrganisationByPageDb,
  getOrganisationCount,
  getOrganisationDetailsById,
  updateOrganisationDB,
} from "../services/organisation.service";
import { getSession } from "../services/session.service";
import { getOrganisationList } from "@/app/services/organisation.service";
import { SqlError } from "mariadb";
import * as mdl from "../models/models";
import { bigIntToNum } from "../utils/db/types";
import { getObjectByName } from "./rights.controller";
import { getDocs, uploadDocument } from "./document.controller";
import { getRegionalSettings } from "./config.controller";
import { getScreenDescription } from "./object.controller";
import { ORGANISATION_OBJECT_ID } from "../utils/consts.utils";

export async function createOrganisation(data: zm.organisationSchemaT,docData : zm.docDescriptionSchemaT[]) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.organisationSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await createOrganisationDB(
          session,
          data as zm.organisationSchemaT
        );

        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
          const objectDetails = await getObjectByName("Organisation");
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

export async function updateOrganisation(data: zm.organisationSchemaT, docData : zm.docDescriptionSchemaT[]) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const parsed = zs.organisationSchema.safeParse(data);
      if (parsed.success) {
        const dbResult = await updateOrganisationDB(
          session,
          data as zm.organisationSchemaT
        );
        
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
          const objectDetails = await getObjectByName("Organisation");
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
      console.log(e.message, "-", e.cause, "-", e.sqlMessage);
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
      const userRights = {};
      const configData = await getRegionalSettings();
      const screenDesc = await getScreenDescription(ORGANISATION_OBJECT_ID);
      const loggedInUserData = {
        name: session.user.name,
        userId : session.user.userId
      }
      if(id)
      {
          const organisationDetails = await getOrganisationDetailsById(session.user.dbInfo.dbName, id);
          if(organisationDetails.length>0){
            const objectDetails = await getObjectByName("Organisation");
            const docData = await getDocs(id,objectDetails[0].object_id);
            if (organisationDetails.length > 0 && docData.length > 0) {
              organisationDetails[0].docData = docData;
            } else {
              organisationDetails[0].docData = [];
            }
            const result = [
              screenDesc,
              organisationDetails[0],
              userRights,
              configData,
              loggedInUserData
            ]

            return [
              result
            ]
        }
      }
      const result=[
        screenDesc,
        userRights,
        configData,
        loggedInUserData
      ]
      return[
        result
      ]
    }
  } catch (error) {
    throw error;
  }
}

export async function getOrganisationByPage(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getOrg = {
    status: false,
    data: [] as mdl.organisationSchemaT[],
    count: 0,
    error: {},
  };
  try {
    const appSession = await getSession();

    if (appSession?.user.dbInfo) {
      const dbData = await getOrganisationByPageDb(
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
        data: dbData.map(bigIntToNum) as mdl.organisationSchemaT[],
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    let err = "Organisation Admin, E-Code:369";

    getOrg = {
      ...getOrg,
      status: false,
      data: [] as mdl.organisationSchemaT[],
      error: err,
    };
  }
  return getOrg;
}

export async function delOrganisationById(id: number) {
  let result;
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      const dbResult = await delOrganisationDetailsById(session.user.dbInfo.dbName, id);
      if (dbResult[0][0].error === 0) {
        result = { status: true };
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
    } 
    else {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    };
  }
  return result;
} 
catch (error:any) {
      throw error;
    }
  }