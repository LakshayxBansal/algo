'use server'
 
import * as zs from '../zodschema/zodschema';
import {executiveGroupSchemaT} from '@/app/models/models';
import { getExecutiveGroupList, createExecutiveGroupDb } from '../services/executiveGroup.service';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';


export async function getExecutiveGroup(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveGroupList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}



export async function createExecutiveGroup(formData: FormData){
  let result;
    try {
    const session = await getSession();
    if (session) {
      let data: { [key: string]: any } = {}; // Initialize an empty object

      for (const [key, value] of formData.entries()) {
        data[key] = value;
      }
  
      const parsed = zs.executiveGroupSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createExecutiveGroupDb(session, data as executiveGroupSchemaT);
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
