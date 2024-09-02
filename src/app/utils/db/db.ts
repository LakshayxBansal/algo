// db.js
import mariadb from 'mariadb';
import { dbMap } from './SingletonMap';

//const dbMap = SingletonMap<string, mariadb.Pool>;

function getPool(host: string) {
  try {
    let pool = dbMap.get(host);
    if (!pool) {
      pool = mariadb.createPool({
        host: process.env.USERDB_HOST,
        port: 3306,
        database: host,
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
        connectionLimit: 5
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
export default async function excuteQuery({host , query, values }: {host: string, query: string, values: any}) {
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
