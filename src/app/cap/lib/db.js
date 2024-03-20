// db.js
import mysql from 'serverless-mysql';

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
//const poolDBConnects=[];

//function getDBConnection(host: string) ()


export async function excuteQuery({ query, values }) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}


export async function excuteQueryUserDb({ query, values }) {
  try {
    const results = await userDb.query(query, values);
    await userDb.end();
    return results;
  } catch (error) {
    return { error };
  }
}