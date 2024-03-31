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


const dbMap = SingletonMap.getInstance<string, mariadb.Pool>();

function getConnection(host: string) {
  const pool = dbMap.get(host);
  if (pool) {
    return pool.getConnection();
  } else {
    dbMap.set('crmDb', mariadb.createPool({
        host: process.env.MYSQL_HOST,
        port: 3306,
        database: 'crmdb',
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
        password: process.env.USERDB_PASSWORD
      }
    ));
    return dbMap.get(host)?.getConnection() ?? null;
  }
}

/**
 * 
 * @param param0 {host name, query, replacement values}
 * @returns result or null in case of error
 */
export default async function excuteQuery({host, query, values }) {
  let db;
  let results;
  try {
    db = await getConnection(host);

    if (db) {
      results = await db.query(query, values);
    }
  } catch (e) {
    throw (e);
  } finally {
    if (db) {
      db.end();
    }
  }
  return results;
}
