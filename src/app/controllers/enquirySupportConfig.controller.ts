'use server'
import { enquiryConfigSchemaT } from '../models/models';
import { getSession } from '../services/session.service';
import { getEnquirySupportConfigDB, updateEnquirySupportConfigDB } from '../services/enquirySupportConfig.service';
import { enquirySupportConfig } from '../zodschema/zodschema';
import { SqlError } from "mariadb";
import { logger } from '@/app/utils/logger.utils';

export async function updateEnquirySupportConfig(data: enquiryConfigSchemaT) {

  let result;

  try {
    const session = await getSession();

    if (session) {

      const parsed = enquirySupportConfig.safeParse(data);

      if (parsed.success) {

        const dbResult = await updateEnquirySupportConfigDB(session, data);
        // console.log('sdsdsds', dbResult.length);
        if (dbResult.length > 0) {
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
    console.log(e);

    if (e instanceof SqlError && e.code === "ER_DUP_ENTRY") {
      result = {
        status: false,
        data: [{ path: ["name"], message: "Error: Value already exists" }],
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


export async function loadEnquirySupportConfig(): Promise<enquiryConfigSchemaT | null> {
  try {
    const session = await getSession();

    if (!session?.user?.dbInfo) {
      throw new Error('Session or database info not available');
    }

    const config = await getEnquirySupportConfigDB(session.user.dbInfo.dbName);
    return config;

  } catch (error) {
    console.error('Error loading enquiry support config:', error);
    return null;
  }
}










