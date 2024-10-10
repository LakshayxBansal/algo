// db.js
import mariadb from 'mariadb';
import { dbMap } from './SingletonMap';
import { getHostDetailsService } from '@/app/services/company.service';
import {Mutex} from 'async-mutex';

// const dbMapcl = dbMap;
// export async function getPool1(host: string) {
//   let result;
//   try {
//     const mutex = new Mutex();

    
//     await mutex.runExclusive(async () => {

//       let pool = dbMapcl.get(host);
//       if(pool) {
//         result = pool;
//       } else {
//         console.log("xxxxxxxx   xxxx NOT FOUND IN POOL: ----", host);
  
//         let hostIp, hostPort;
//         if(host === "userDb"){
//           hostIp = process.env.USERDB_HOST;
//           hostPort = Number(process.env.USERDB_PORT);
//         }
//         else {
//           const data = await getHostDetailsService(host);
//           hostIp = data.hostIp;
//           hostPort = data.hostPort;
//         }
  
//         pool = mariadb.createPool({
//           host: hostIp,
//           port: hostPort,
//           database: host,
//           user: process.env.USERDB_USER,
//           password: process.env.USERDB_PASSWORD,
//           connectionLimit: Number(process.env.DB_POOL_SIZE)
//         });
  
//         dbMapcl.set(host, pool);
//         console.log("-***-NEW POOL created for : ----", host, "\n\n");
//         result =  dbMapcl.get(host);
//       } 
//     });
//     return result;
//   } catch (e) {
//     console.log(e);
//     return null;
//   }
//   return result;
// }


// get individual connection

async function getPool(host: string) {
  let conn;

  try {

      let hostIp, hostPort;
      if(host === "userDb"){
        hostIp = process.env.USERDB_HOST;
        hostPort = Number(process.env.USERDB_PORT);
      }
      else {
        const data = await getHostDetailsService(host);
        hostIp = data.hostIp;
        hostPort = data.hostPort;
      }
     conn = await mariadb.createConnection({
        host: hostIp,
        port: hostPort,
        database: host,
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
     });

     if (conn) {
      return conn;
     } 

  } catch (err) {
     // Manage Errors
     console.log(err);
  } 
  return null;
}
/**
 * 
 * @param param0 {host name, query, replacement values}
 * @returns result or null in case of error
 */
export default async function excuteQuery({host, query, values }: {host: string, query: string, values: any}) {
  let results;
  let db;
  try {
    db = await getPool(host);
    
    if (db) {
      results = await db.query(query, values);
    }
  } catch (e) {
    throw (e);

  } finally {
    db?.end();
  } 

  // console.log("these are the results",results)
  return results;
}



/**
 * 
 * @param param0 {host name, query, replacement values}
 * @returns result or null in case of error
 */
// export default async function excuteQueryConn({host, query, values }: {host: string, query: string, values: any}) {
//   let results;
//   let conn;
//   try {
//     conn = await getConn(host);
    
//     if (conn) {
//       results = await conn.query(query, values);
//     }
//   } catch (e) {
//     throw (e);
//   } finally {
//     // Close Connection
//     if (conn) await conn.end();
//   }
//   // console.log("these are the results",results)
//   return results;
// }

// To create database using provided host and port
export async function createDbConn({hostIp, hostPort, query}: {hostIp: string, hostPort: number, query: string}){
  let conn;
  try {
    conn = await mariadb.createConnection({
      host: hostIp,
      port: hostPort,
      user: process.env.USERDB_USER,
      password: process.env.USERDB_PASSWORD,
    })

    const results = await conn.query(query);
    return results;
  } catch (error) {
    throw error
  }
}