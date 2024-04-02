// db.js
import mariadb from 'mariadb';
import { SingletonMap } from './SingletonMap';

/*
const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD
  }
});

const userDb = mysql({
  config: {
    host: process.env.USERDB_HOST,
    port: process.env.USERDB_PORT,
    database: process.env.USERDB_DATABASE,
    user: process.env.USERDB_USER,
    password: process.env.USERDB_PASSWORD
  }
});
*/

// return pool.getConnection();

const dbMap = SingletonMap.getInstance<string, mariadb.Pool>();

function getPool(host: string) {
  const pool = dbMap.get(host);
  if (pool) {
    return pool;
  } else {
    dbMap.set('crmDb', mariadb.createPool({
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: 'crmDb',
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
        connectionLimit: 5
      }
    ));
    dbMap.set('userDb', mariadb.createPool({
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: 'userDb',
        user: process.env.USERDB_USER,
        password: process.env.USERDB_PASSWORD,
        connectionLimit: 5
      }
    ));
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
  return results;
}
