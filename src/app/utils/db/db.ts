// db.js
import mariadb from 'mariadb';
import { dbMap } from './SingletonMap';

//const dbMap = SingletonMap<string, mariadb.Pool>;

function getPool(host: string) {
  const pool = dbMap.get(host);
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
    return dbMap.get(host) ?? null;
  }
}

function getHostPool(dbName: string, host: string, port: number) {
  const pool = dbMap.get(dbName);
  if (pool) {
    return pool;
  } else {
    dbMap.set(dbName, mariadb.createPool({
        host: host,
        port: port,
        database: dbName,
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
        connectionLimit: 5
      }
    ));
    return dbMap.get(dbName) ?? null;
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
    db = getPool(host);
    
    if (db) {
      results = await db.query(query, values);
    }
  } catch (e) {
    throw (e);

  } 
  return results;
}


export async function executeQueryPool({dbName, host, port, query, values}: {dbName: string, host: string, port: number, query: string, values: any}) {
  let db;
  let results;
  try {
    db = getHostPool(dbName, host, port);
    
    if (db) {
      results = await db.query(query, values);
    }
  } catch (e) {
    throw (e);

  } 
  return results;
}
