'use server'

import excuteQuery, {executeQueryPool}  from '../utils/db/db';
import * as zm from "../models/models";
import { dbTables } from '../utils/companyDBScript';
import { dbProcedures, dbTableScript } from '../utils/tableScript';

export async function getHostId() {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'select * from dbHost d where d.useForNextDb = 1;', 
      values: [],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function checkDbInfo(dbName: string) {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'select count(*) as temp from dbInfo d where d.name = ?;', 
      values: [dbName],
    });
    return result;
  } catch (e) {
    console.log(e);
  }
  return null;
}

/**
 * creates a database for the company name specified. 
 * Removes spaces from the name and adds 4 random letters.
 * right now just returns an unused db from the dbInfo
 * Returns the dbInfo object with {dbId, dbName}
 * @param compName Name of the company
 * 
*/
export async function createCompanyDB( dbName: string, host: string, port: number) {
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

export async function createTables( dbName: string) {
  try {
    const scripts : string[] = dbTableScript.split(';')  
    let result
    for(let idx in scripts){
      
      if(scripts[idx] != ''){
        result += await excuteQuery({
            host: dbName,
            query: scripts[idx]+';',
            values: [],
        });
      }
    }
    return result
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function createProcedures( dbName: string) {
  try {
    const scripts : string[] = dbProcedures.split('~')  
    let result
    for(let idx in scripts){
      let query = scripts[idx]
      
      result += await excuteQuery({
          host: dbName,
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

export async function updateCompanyInfo( dbInfoId: number, companyId: number) {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'update company c set c.dbinfo_id = ? where c.id = ?', 
      values: [dbInfoId, companyId] 
    });
    return result;
  } catch(e) {
    console.log(e);
  }
}

export async function assignUserCompany(companyId: number, email: string){
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'INSERT INTO userCompany (userId, companyId, isAdmin) \
        select userId, ?, 1 from user where email=?;',
      values:[companyId, email]
    }); 
    return result;
  } catch (e) {
    console.log(e);
  }
}


// function generateRandomString(length: number): string {
//   const letters = 'abcdefghijklmnopqrstuvwxyz';
//   let result = '';
//   for (let i = 0; i < length; i++) {
//       const randomIndex = Math.floor(Math.random() * letters.length);
//       result += letters[randomIndex];
//   }
//   return result;
// }

