"use server"

import { Session } from "inspector";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";


/**
 *
 * @param crmDb database to search in
 * @param searchData partial string to search in executive_master.name
 * @returns
 */
export async function searchMainDataDB(crmDb:string, searchData:string){
    let result;
    try{
        result =  await excuteQuery({
            host:crmDb,
            query:"call mainSearchBar(?)",
            values:searchData
        })
    }catch(e){
        logger.error(e);
    }
    return result;
}
