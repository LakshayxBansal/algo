'use server'
 
import {enquirySubStatusMaster} from '../zodschema/zodschema';
import {enquirySubStatusMasterT} from '@/app/models/models';
import { getEnquirySubStatusList, createEnquirySubStatusDb, getEnquirySubStatusDetailsById, Pagination, getEnquirySubStatusCount } from '../services/enquirySubStatus.service';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';
import { bigIntToNum } from "../utils/db/types";
import * as mdl from "../models/models";

export async function getEnquirySubStatus(searchString: string, status: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySubStatusList(session.user.dbInfo.dbName, searchString, status);
    }
  } catch (error) {
    throw error;
  }
}



export async function createEnquirySubStatus(formData: FormData){
  let result;
    try {
    const session = await getSession();
    if (session) {
      let data: { [key: string]: any } = {}; // Initialize an empty object

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
  
      const parsed = enquirySubStatusMaster.safeParse(data);
      if(parsed.success) {
        const dbResult = await createEnquirySubStatusDb(session, data as enquirySubStatusMasterT);
        if (dbResult.length >0 ) {
         result = {status: true, data:dbResult};
        } else {
          result = {status: false, data: [{path:["form"], message:"Error: Error saving record"}] };
        }
      } else {
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

export async function getEnquirySubStatusById(id: number) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySubStatusDetailsById(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}

export async function getEnquirySubStatus1(
  page: number,
  filter: string | undefined,
  limit: number
) {
  let getEnquirySubStatus = {
    status: false,
    data: {} as mdl.enquirySubStatusMasterT,
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
      const rowCount = await getEnquirySubStatusCount(
        appSession.user.dbInfo.dbName as string,
        filter
      );
      getEnquirySubStatus = {
        status: true,
        data: conts.map(bigIntToNum) as mdl.enquirySubStatusMasterT,
        count: Number(rowCount[0]["rowCount"]),
        error: {},
      };
    }
  } catch (e: any) {
    console.log(e);

    let err = "EnquirySubStatus Admin, E-Code:369";

    getEnquirySubStatus = {
      ...getEnquirySubStatus,
      status: false,
      data: {} as mdl.enquirySubStatusMasterT,
      error: err,
    };
  }
  return getEnquirySubStatus;
}