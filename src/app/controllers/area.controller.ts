'use server'
 
import * as zs from '../zodschema/zodschema';
import { getAreaList, createAreaDb ,getAreaByIDList,updateAreaDb} from '../services/area.service';
import { getSession } from '../services/session.service';
import { SqlError } from 'mariadb';
import { areaSchemaT } from '../models/models';


export async function getArea(searchString: string) {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAreaList(session.user.dbInfo.dbName, searchString);
    }
  } catch (error) {
    throw error;
  }
}

export async function getAreaById (id : string){
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getAreaByIDList(session.user.dbInfo.dbName, id);
    }
  } catch (error) {
    throw error;
  }
}



export async function createArea(data: areaSchemaT){
  let result;
    try {
    const session = await getSession();
    if (session) {
  
      const parsed = zs.areaSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await createAreaDb(session, data);
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

export async function updateArea(data: areaSchemaT){
  let result;
    try {
    const session = await getSession();
    if (session) {
      // const data = {
      //   name: areadata.get("name") as string,
      // };
  
      const parsed = zs.areaSchema.safeParse(data);
      if(parsed.success) {
        const dbResult = await updateAreaDb(session, data);
        if (dbResult.length >0 && dbResult[0][0].error === 0) {
          result = {status: true, data:dbResult[1]};
         } else {
          result = {status: false, data: [{path:[dbResult[0][0].error_path], message:dbResult[0][0].error_text}] };
         }
      } else {
        let errorState: {path: (string | number)[], message: string}[] = [];
        for (const issue of parsed.error.issues) {
          errorState.push({ path: issue.path, message: issue.message});
        }
        result = {status: false, data:errorState };
        return result;
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