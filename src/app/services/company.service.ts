'use server'

import excuteQuery  from '../utils/db/db';


/**
 * creates a database for the company name specified. 
 * Removes spaces from the name and adds 4 random letters.
 * right now just returns an unused db from the dbInfo
 * Returns the dbInfo object with {dbId, dbName}
 * @param compName Name of the company
 * 
 */
export async function createCompanyDB(compName: string) {
  try {
    // create dbName
    let companyName = compName?.replace(/\s/g, "");
    if (companyName.length >= 40) {
      companyName = companyName.substring(0,40);
    }
    const dbName = companyName + generateRandomString(4);

    const result = await excuteQuery({
      host: 'userDb',
      query: 'select d.dbId from dbInfo d, company c where d.dbId not in (select dbId from company) LIMIT 1;', 
      values: [],
    });
    return JSON.parse(JSON.stringify(result));
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
export async function createCompanyInfo(dbInfo: {name:string, add1: string, add2: string, state: string, city: string, pin: string}, 
          dbId: number) {
  try {
    const result = await excuteQuery({
      host: 'userDb',
      query: 'insert into company (nameVal, add1, add2, city, pincode, dbId) values \
        (?, ?, ?, ?, ?, ?) returning *;', 
      values: [dbInfo.name, dbInfo.add1, dbInfo.add2, dbInfo.city, dbInfo.pin, dbId]        
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


function generateRandomString(length: number): string {
  const letters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      result += letters[randomIndex];
  }
  return result;
}