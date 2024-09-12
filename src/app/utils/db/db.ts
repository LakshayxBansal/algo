// db.js
import mariadb from 'mariadb';
// import { dbMap } from './SingletonMap';
import { dbMap } from './SingletonMap';
import { getHostDetailsService } from '@/app/services/company.service';

//const dbMap = SingletonMap<string, mariadb.Pool>;
<<<<<<< HEAD
// console.log("this is the console data",dbMap)


// below code
// map is created as we have more than one databases in our system
function getPool(host: string) {
  const pool = dbMap.get(host);
  // console.log("mariaDb",pool);
  if (pool) {
    return pool;
  } else {
    dbMap.set(host, mariadb.createPool({
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: host,
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
        connectionLimit: 5
      }
    ));
    // console.log(dbMap.get(host));
    return dbMap.get(host) ?? null;
=======
async function getPool(host: string) {
  try {
    let pool = dbMap.get(host);
    
    if (!pool) {
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

      pool = mariadb.createPool({
        host: hostIp,
        port: hostPort,
        database: host,
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
        connectionLimit: Number(process.env.DB_POOL_SIZE)
      });
      dbMap.set(host, pool);
    }
    return pool ?? null;
  } catch (e) {
    console.log(e);
    return null;
>>>>>>> 339f2a559516912d0ee65abd701d7085d235f7df
  }

}
/**
 * 
 * @param param0 {host name, query, replacement values}
 * @returns result or null in case of error
 */
export default async function excuteQuery({host, query, values }: {host: string, query: string, values: any}) {
  let db;
  let results;
  try {
    db = await getPool(host);
    
    if (db) {
      results = await db.query(query, values);
    }
  } catch (e) {
    throw (e);

  } 
  // console.log("these are the results",results)
  return results;
}


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