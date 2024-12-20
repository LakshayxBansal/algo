"use server";
import { getStatusDataDB, searchMainDataDB, updateStatusDataDB } from "../services/navbar.service";
import { bigIntToNum } from "../utils/db/types";
import { logger } from "../utils/logger.utils";
import * as zs from "../zodschema/zodschema";
import * as mdl from "../models/models";

// import { getSession } from "next-auth/react";
import { getSession } from "../services/session.service";

/**
 *
 * @param searchData partial string for executive name
 * @returns
 */

export async function searchMainData(searchData: string) {
  let result =  {} as mdl.searchDataT ;

  try {
    const session =  await getSession();
    if(session?.user.dbInfo){
    const result1 = await searchMainDataDB(session.user.dbInfo.dbName, searchData);
    result = result1[0];
    }
  } catch (e) {
    logger.error(e);
  }
  return result;
}

export async function getStatusData(userId : number) {
  try{
    const session = await getSession();
    if(session?.user.dbInfo){
      const result = await getStatusDataDB(session.user.dbInfo.dbName,userId);
      return result;
    }
  }catch(error){
    logger.error(error);
  }
}

export async function updateStatusData(data : string, id : number) {
  try{
    const session = await getSession();
    if(session?.user.dbInfo){
      const result = await updateStatusDataDB(session.user.dbInfo.dbName,data,id);
      return result;
    }
  }catch(error){
    logger.error(error);
  }
}

