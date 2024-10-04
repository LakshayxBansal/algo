"use server";
import { searchMainDataDB } from "../services/navbar.service";
import { bigIntToNum } from "../utils/db/types";
import { logger } from "../utils/logger.utils";
import * as zs from "../zodschema/zodschema";
import * as mdl from "../models/models";

import { getSession } from "next-auth/react";

/**
 *
 * @param data partial string for executive name
 * @returns
 */

export async function searchMainData(data: string) {
  let result =  {} as mdl.searchDataT ;

  try {
    // const session =  await getSession();
    // console.log("session",session)
    // if(session){
    const result1 = await searchMainDataDB("crmapp1", data);
    result = result1[0];
    // }
  } catch (e) {
    logger.error(e);
  }
  return result;
}
