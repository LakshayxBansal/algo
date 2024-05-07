'use server'
 
import * as zs from '../zodschema/zodschema';
import { getEnquirySourceList, createEnquirySourceDb } from '../services/enquirySource.service';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';


export async function getEnquirySource(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquirySourceList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}



export async function createEnquirySource(formData: FormData){
  let result;
    try {
    const session = await getSession();
    if (session) {
      const data = {
        name: formData.get("name") as string,
      };
  
      const parsed = zs.nameMasterData.safeParse(data);
      if(parsed.success) {
        const dbResult = await createEnquirySourceDb(session, data);
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
