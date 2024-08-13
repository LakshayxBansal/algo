'use server'
 
import * as zs from '../zodschema/zodschema';
import {executiveGroupSchemaT} from '@/app/models/models';
import { getExecutiveGroupList, createExecutiveGroupDb,updateExecutiveGroupDb,getExecutiveGroupByIDList} from '../services/executiveGroup.service';
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

export async function getExecutiveGroupById(id : string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getExecutiveGroupByIDList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}



export async function createExecutiveGroup(data: executiveGroupSchemaT){
  let result;
    try {
    const session = await getSession();
    if (session) {
      // let data: { [key: string]: any } = {}; // Initialize an empty object

      // for (const [key, value] of data.entries()) {
      //   data[key] = value;
      // }
  
      const parsed = zs.executiveGroupSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createExecutiveGroupDb(session, data as executiveGroupSchemaT);
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          result = {
            status: false,
            data: errorState,
          };
        }
      } else {
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
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

export async function updateExecutiveGroup(data: executiveGroupSchemaT){
  let result;
    try {
    const session = await getSession();
    if (session) {
      // let data: { [key: string]: any } = {}; // Initialize an empty object

      // for (const [key, value] of data.entries()) {
      //   data[key] = value;
      // }
  
      const parsed = zs.executiveGroupSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await updateExecutiveGroupDb(session, data as executiveGroupSchemaT);
        if (dbResult[0].length === 0) {
          result = { status: true, data: dbResult[1] };
        } else {
          let errorState: { path: (string | number)[]; message: string }[] = [];
          dbResult[0].forEach((error: any) => {
            errorState.push({
              path: [error.error_path],
              message: error.error_text,
            });
          });
          result = {
            status: false,
            data: errorState,
          };
        }
      } else {
        let errorState: { path: (string | number)[]; message: string }[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message });
        }
        result = { status: false, data: errorState };
        return result;
      }
    } else {
      result = {
        status: false,
        data: [{ path: ["form"], message: "Error: Server Error" }],
      };
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
