"use server"
import { searchMainDataDB } from "../services/navbar.service";
import { logger } from "../utils/logger.utils";
import * as zs from "../zodschema/zodschema";


import { getSession } from "next-auth/react";

export async function searchMainData(data:string){
    console.log(data)
    let result;
try{
const session =  await getSession();
    if(session){
         result = await searchMainDataDB(session.user.dbInfo.dbName as string,data)
        //  console.log("controller",result); 
    }
}catch(e){
    logger.error(e);
    console.log("error",e)
}
console.log(" this is the result", result)
return result;
}