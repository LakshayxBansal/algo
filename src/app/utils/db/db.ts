// db.js
import mariadb from 'mariadb';
// import { dbMap } from './SingletonMap';
import { dbMap } from './SingletonMap';
import { getHostDetailsService } from '@/app/services/company.service';

//const dbMap = SingletonMap<string, mariadb.Pool>;
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