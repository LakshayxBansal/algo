'use server'
import excuteQuery, {executeQueryPool}  from '../utils/db/db';
import * as zm from "../models/models";
import { dbTableAndProScript } from '../utils/tableScript';

export async function getCompanyDetailsById(id: number) {
  try {
    const result = await excuteQuery({
      host: 'user',
      query:
        "select c.id, c.alias, c.name, c.add1, c.add2, c.city, c.state_id state_id, c.pincode, c.country_id country_id, \
        s.name state, co.name company \
        left outer join state_master s on c.state_id = s.id \
        left outer join country_master co on c.country_id = co.id \
        where c.id=?;",
      values: [id],
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}

export async function getHostId() {
  let result
  try {
    const data = await excuteQuery({
      host: 'userDb',
      query: 'select * from dbHost d where d.useForNextDb = 1;', 
      values: [],
    });
    result = {
      status: true,
      data: data[0]
    }
  } catch (e) {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    }
  }
  return result;
}

export async function createCompanyDB(dbName: string, host: string, port: number) {
  let result
  try {
    const data = await executeQueryPool({
      dbName: 'userDb',
      host: host,
      port: port,
      query: 'create database ' + dbName,
      values: [dbName],
    });
    result = {
      status: true,
      data: data[0]
    }
  } catch (e) {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    }
  }
  return result;
}

export async function createTablesAndProc(dbName: string, host: string, port: number) {
  let result
  try {
    const scripts : string[] = dbTableAndProScript.split('~')  
    let data
    for(let idx in scripts){
      let query = scripts[idx]
      data += await executeQueryPool({
        dbName: dbName,
        host: host,
        port: port,
        query: query,
        values: [],
      });
    }
    result = {
      status: true,
      data: data
    }
  } catch (e) {
    result = {
      status: false,
      data: [{ path: ["form"], message: "Error: Server Error" }],
    }
  }
  return result;
}

export async function createCompanyAndInfoDb(hostId: number, dbName: string, company: zm.companySchemaT, userEmail: string) {
  try {    
    const result = await excuteQuery({
      host: 'userDb',
      query: 'call createCompanyAndInfo(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
      values: [dbName, hostId, company.name, company.alias, company.add1, company.add2, company.country_id, company.state_id, company.city, company.pincode, userEmail] 
    });
    return result;
  } catch(e) {
    console.log(e);
  }
}


// export async function assignUserCompany(companyId: number, email: string){
//   try {
//     const result = await excuteQuery({
//       host: 'userDb',
//       query: 'INSERT INTO userCompany (user_id, company_id, isAdmin) values \
//         ((select id from user where email=?), ?, 0)',
//       values:[email, companyId]
//     }); 
//     return result;
//   } catch (e) {
//     console.log(e);
//   }
// }

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

export async function deleteCompanyAndDbInfo(companyId: number, dbInfoId: number, userCompanyId: number){
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

    result += await excuteQuery({
      host: 'userDb',
      query: 'DELETE FROM userCompany WHERE id = ?',
      values:[userCompanyId]
    });

    return result;
  } catch (e) {
    console.log(e);
  }
}