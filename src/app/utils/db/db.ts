// db.js
import mariadb from 'mariadb';
import { dbMap } from './SingletonMap';

//const dbMap = SingletonMap<string, mariadb.Pool>;
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
  // console.log("these are the results",results)
  return results;
}
