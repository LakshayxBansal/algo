'use server'
import excuteQuery, {executeQueryPool}  from '../utils/db/db';
import * as zm from "../models/models";
import { dbTableAndProScript } from '../utils/tableScript';

export async function getCompanyDetailsById(id: number) {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query:
        "select c.id, c.alias, c.name, c.add1, c.add2, c.city, c.state_id state_id, c.pincode, c.country_id country_id, \
        s.name state, co.name country from company c\
        left outer join crmapp.state_master s on c.state_id = s.id \
        left outer join crmapp.country_master co on c.country_id = co.id \
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

export async function getCompaniesDb(
  userId: number,
  page: number,
  filter: string | undefined,
  limit: number
) {
  try {
    const vals: any = [userId, page, limit, limit];

    if (filter) {
      vals.unshift(filter);
    }

    const result = await excuteQuery({
      host: "userDb",
      query: "SELECT company_id id, companyName, companyAlias, dbinfo_id,\
         (SELECT u.name as userName FROM user u where u.id=createdBy) as createdBy, createdOn, \
          CONCAT(dbInfoName, dbInfoId) dbName, host, port, userId, RowNum as RowID\
          FROM (SELECT c.id as company_id, c.name as companyName, c.alias as companyAlias, c.dbinfo_id dbinfo_id,\
          c.created_by createdBy, c.created_on createdOn,\
          h.host host, h.port port, d.name as dbInfoName, d.id as dbInfoId, u.id as userId, ROW_NUMBER() OVER () AS RowNum \
          FROM userCompany as uc, \
          user u, \
          dbInfo d, dbHost h,\
          company c WHERE\
          u.id = uc.user_id and \
          uc.company_id = c.id and \
          c.dbinfo_id = d.id and \
          d.host_id = h.id AND" + (filter ? "c.name LIKE CONCAT('%',?,'%') AND" : "") + " u.id=? \
          order by c.name) AS NumberedRows\
          WHERE RowNum > ?*?\
          ORDER BY RowNum\
          LIMIT ?;",
          values: vals,
        });
        return result
  } catch (e) {
    console.log(e);
  }
}

export async function getCompanyCount(userId: number, value: string | undefined) {
  try {
    return excuteQuery({
      host: "userDb",
      query:
        'Select count(*) as rowCount from \
          company as c, \
          userCompany as uc, \
          user as u\
          where \
          u.id=? and \
          u.id = uc.user_id and \
          uc.company_id = c.id' + (value ? " and c.name LIKE CONCAT('%',?,'%')" : ''),
      values: [userId, value],
    });
  } catch (e) {
    console.log(e);
  }
}


export async function updateCompanyDB(
  data: zm.companySchemaT,
) {
  try {
    return excuteQuery({
      host: "userDb",
      query:
        "call updateCompany(?, ?, ?, ?, ?, ?, ?, ?, ?);",
      values: [
        data.id, 
        data.name,
        data.alias,
        data.add1,
        data.add2,
        data.country_id,
        data.state_id,
        data.city,
        data.pincode,
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
