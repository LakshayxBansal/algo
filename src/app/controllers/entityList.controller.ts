import { getSession } from "../services/session.service";
import { logger } from "../utils/logger.utils";

export async function getRoleID(){
    let result:any;
    try{
        const session =await getSession();
        if(session){
            // const result = await getRoleIDDb();
        result  = session.user.dbInfo.roleId
        }
    }catch (e){
        logger.error(e);
    }
  return result;
}