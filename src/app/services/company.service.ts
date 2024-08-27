'use server'
import excuteQuery, {executeQueryPool}  from '../utils/db/db';
import * as zm from "../models/models";
import { dbProcedures, dbTableScript } from '../utils/tableScript';

export async function getHostId() {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'select * from dbHost d where d.useForNextDb = 1;', 
      values: [],
    });
    return result
  } catch (e) {
    return e
  }
}

// export async function checkDbInfo(dbName: string) {
//   try {
//     const result = await excuteQuery({
//       host: 'userDb',
//       query: 'select count(*) as temp from dbInfo d where d.name = ?;', 
//       values: [dbName],
//     });
//     return result;
//   } catch (e) {
//     return e
//   }
//   return null;
// }

/**
 * creates a database for the company name specified. 
 * Removes spaces from the name and adds 4 random letters.
 * right now just returns an unused db from the dbInfo
 * Returns the dbInfo object with {dbId, dbName}
 * @param compName Name of the company
 * 
*/
export async function createCompanyDB(dbName: string, host: string, port: number) {
  try {
    const result = await executeQueryPool({
      dbName: 'userDb',
      host: host,
      port: port,
      query: 'create database ' + dbName,
      values: [dbName],
    });
    return result
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createTables(dbName: string, host: string, port: number) {
  try {
    const scripts : string[] = dbTableScript.split('~')  
    let result
    for(let idx in scripts){
      let query = scripts[idx]
      result += await executeQueryPool({
        dbName: dbName,
        host: host,
        port: port,
        query: query,
        values: [],
      });
    }
    return result
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createProcedures(dbName: string, host: string, port: number) {
  try {
    const scripts : string[] = dbProcedures.split('~')  
    let result
    for(let idx in scripts){
      let query = scripts[idx]
      
      result += await executeQueryPool({
        dbName: dbName,
        host: host,
        port: port,
        query: query,
        values: [],
      });
    }
    return result
  } catch (e) {
    console.log(e);
  }
  return null;
}


/**
 * creates the compnay record and associates a blank DB with it
 * @param param0 json object with company infor
 * @param dbId database id to be associated with company
 */
export async function createCompanyAndInfoDb(hostId: number, dbName: string, dbInfo: zm.companySchemaT) {
  try {    
    const result = await excuteQuery({
      host: 'userDb',
      query: 'call createCompanyAndInfo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      values: [dbName, hostId, dbInfo.name, dbInfo.alias, dbInfo.add1, dbInfo.add2, dbInfo.country_id, dbInfo.state_id, dbInfo.city, dbInfo.pincode] 
    });
    return result;
  } catch(e) {
    console.log(e);
  }
}

// export async function updateCompanyInfo( dbInfoId: number, companyId: number) {
//   try {
//     const result = await excuteQuery({
//       host: 'userDb',
//       query: 'update company c set c.dbinfo_id = ? where c.id = ?', 
//       values: [dbInfoId, companyId] 
//     });
//     return result;
//   } catch(e) {
//     console.log(e);
//   }
// }

export async function assignUserCompany(companyId: number, email: string){
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'INSERT INTO userCompany (user_id, company_id, isAdmin) values \
        ((select id from user where email=?), ?, 0)',
      values:[email, companyId]
    }); 
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function dropDatabase(dbName: string){
  try {
    const result = await excuteQuery({
      host: dbName,
      query: 'DROP DATABASE ' + dbName,
      values:[]
    }); 
    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteCompanyAndDbInfo(companyId: number, dbInfoId: number){
  try {
    let result = await excuteQuery({
      host: 'userDb',
      query: 'DELETE FROM company WHERE id = ?',
      values:[companyId]
    }); 

    result += await excuteQuery({
      host: 'userDb',
      query: 'DELETE FROM dbInfo WHERE id = ?',
      values:[dbInfoId]
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}