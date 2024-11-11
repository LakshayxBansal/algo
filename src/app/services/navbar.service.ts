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

export async function getStatusDataDB(crmDb : string, userId : number) {
    try{
        const result =  await excuteQuery({
            host:crmDb,
            query:"select * from status_bar where user_id = ?;",
            values:[userId]
        })
        if(result.length > 0){
            return {id : result[0].id,data : result[0].data};
        }else{
            return null;
       }
    }catch(e){
        logger.error(e);
    }
}

export async function updateStatusDataDB(crmDb : string,data : string, userId : number) {
    try{
        const result =  await excuteQuery({
            host:crmDb,
            query:"update status_bar set data = ? where id = ?;",
            values:[data,userId]
        })
        if(result.ok){
            return data;
        }else{
            return null;
        }
    }catch(e){
        logger.error(e);
    }
}
