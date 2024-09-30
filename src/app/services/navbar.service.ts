"use server"

import { Session } from "inspector";
import excuteQuery from "../utils/db/db";
import { logger } from "../utils/logger.utils";

export async function searchMainDataDB(crmDb:string, data:string){
    let result;
    try{
        result =  await excuteQuery({
            host:"crmapp1",
            query:"call mainSearchBar(?)",
            values:data
        })
        // console.log("this is result", result);
        // return result;
    }catch(e){
        // logger.error(e);
        console.log(e);
    }
    // console.log("this is the result", result)
    return result;
}
