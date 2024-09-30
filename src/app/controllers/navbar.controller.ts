"use server";
import { searchMainDataDB } from "../services/navbar.service";
import { bigIntToNum } from "../utils/db/types";
import { logger } from "../utils/logger.utils";
import * as zs from "../zodschema/zodschema";
import * as mdl from "../models/models";

import { getSession } from "next-auth/react";

export async function searchMainData(searchText: string) {
//   let result = { status: false, data: {} as mdl.searchDataT };
  try {
      const session =  await getSession();
      console.log("session", session)

    // return  searchMainDataDB("crmapp1", data);
    if (session?.user.dbInfo) {
        return searchMainDataDB(session.user.dbInfo.dbName, searchText);
      }
    // result = {
    //   status: true,
    //   data: result1[0],
    // };
    // console.log("this is the resutl", result1);
    // console.log(typeof result1);

    // }
  } catch (e) {
    logger.error(e);
  }
//   console.log("main result",typeof result.data);
//   return result;
}
