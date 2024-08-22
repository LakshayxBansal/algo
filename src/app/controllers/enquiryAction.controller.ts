'use server'
 
import * as zs from '../zodschema/zodschema';
import { getEnquiryActionList, createEnquiryActionDb, fetchEnquiryActionById, getEnquiryActionCount, Pagination } from '../services/enquiryAction.service';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';
import { bigIntToNum } from '../utils/db/types';
import * as mdl from "../models/models";

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

/**
 *
 * @param Id id of the item to be searched
 * @returns
 */
export async function getEnquiryActionById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return fetchEnquiryActionById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getEnquiryActions(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getItem = {
    status: false,
    data: {} as mdl.getItemT,
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
      const rowCount = await getEnquiryActionCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getItem = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.getItemT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "enquiryAction Admin, E-Code:369";

    getItem = {
      ...getItem,
      status: false,
      data: {} as mdl.getItemT,
      error: err,
    };
  }
  return getItem;
}

/**
 * 
 * @param formData 
 * @returns object with status, record if success and error
 */
export async function createEnquiryAction(formData: FormData) {
  let result;
    try {
    const session = await getSession();
    if (session) {
      const data = {
        name: formData.get("name") as string,
      };
  
      const parsed = zs.nameMasterData.safeParse(data);
      if(parsed.success) {
        const dbResult = await createEnquiryActionDb(session, data);
        if (dbResult.length >0 ) {
         result = {status: true, data:dbResult};
        } else {
          result = {status: false, data: [{path:["form"], message:"Error: Error saving record"}] };
        }
      } else {
        //result = {status: false, data: parsed.error.flatten().fieldErrors };
        result = {status: false, data: parsed.error.issues };

      }
    } else {
      result = {status: false, data: [{path:["form"], message:"Error: Server Error"}] };
    }
    return result;
  } catch (e) {
    console.log(e);
    if ((e instanceof SqlError) && e.code === 'ER_DUP_ENTRY' ) {
      result = {status: false, data: [{path:["name"], message:"Error: Value already exist"}] };
      return result;
    }
  }
  result = {status: false, data: [{path:["form"], message:"Error: Unknown Error"}] };
  return result;
}
