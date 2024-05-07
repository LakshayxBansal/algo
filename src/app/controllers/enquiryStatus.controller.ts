'use server'
 
import * as zs from '../zodschema/zodschema';
import { getEnquiryStatusList, createEnquiryStatusDb } from '../services/enquiryStatus.service';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';


export async function getEnquiryStatus(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquiryStatusList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}



/**
 * 
 * @param formData 
 * @returns object with status, record if success and error
 */
export async function createEnquiryStatus(formData: FormData) {
  let result;
    try {
    const session = await getSession();
    if (session) {
      const data = {
        name: formData.get("name") as string,
      };
  
      const parsed = zs.nameMasterData.safeParse(data);
      if(parsed.success) {
        const dbResult = await createEnquiryStatusDb(session, data);
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
