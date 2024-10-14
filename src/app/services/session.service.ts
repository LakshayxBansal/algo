'use server'

import excuteQuery from '../utils/db/db';
import { getServerSession } from "next-auth/next"
import { options } from '../api/auth/[...nextauth]/options';
import { Session } from 'next-auth';
import { dbInfoT } from '../models/models'

const sessionDb = 'userDb';


export async function getDbSession(userId: number): Promise<dbInfoT | null> {
  try {

    const result = await excuteQuery({
      host: sessionDb,
      query: 'select * from session where userId=?',
      values: [userId],
    });

    if (result?.length > 0) {
      return JSON.parse(result[0].data);
    }
    return null;
  } catch (e) {
    console.log(e);
  }
  return null;
}

export async function deleteSession(userId : number) {
  try{
    await excuteQuery({
      host: sessionDb,
      query: 'delete from session where userId=?',
      values: [userId],
    });
  }catch(error){
    console.log(error);
  }
  return null;
}

/*
export async function createSession(value: any) {
  try {
    const result = await excuteQuery({
      host: sessionDb,
      query: 'insert into session (data, userId, last_access) values (?, ?, now())', 
      values: [JSON.stringify(value), value.userId],
    });

    console.log(result);
    if (result.constructor.name === "OkPacket") {
      setSessionCookies({token: value.userId});      
    }
    return true;

  } catch (e) {
    console.log(e);
    throw new Error('error in credentials');
  }

}
*/

async function getLastSession(idUser: number){
  // fetch the session id
  try {
    const result = await excuteQuery ({
      host: sessionDb,
      query: 'select max(sessionId) as sessionId from session where userId=?',
      values: [idUser],
    })
    if (result.length > 0){
      return result[0].sessionId;
    } else {
      throw new Error("session not found");
    }
  } catch (e){
    console.log(e);
    throw new Error("session not found");
  }

}


/**
 * 
 * @param dbInfo object containing the user email, companyinfo and db info
 * @returns 
 */
export async function updateSession(dbInfo: dbInfoT, userId: number){
  try {
    let dbData = await getDbSession(userId);
    const json = JSON.stringify(dbInfo);
    const updQry = 'update session set data=?, last_access=now() where userId=?';
    const insertQry = 'insert into session (data, last_access, userId) values (?, now(), ?)';

    const result = await excuteQuery({
      host: sessionDb,
      query: dbData ? updQry: insertQry, 
      values: [json, userId],
      });
    return result;
  } catch(e) {
    console.log(e);
  }
  return null;
}


/**
 * server function to return the session object at the server
 */
export async function getSession() {
  try {
    const session = await getServerSession(options);
    if (session) {
      if (!session.user.dbInfo) {
        console.log("------------- dbInfo not found -------------")
      }
      return session;
    }
  } catch(e) {
    console.log(e);
  }
  return null;
}

/**
 * server function to return the session object at the server

export async function getAppSession(): Promise<Session | null> {
  try {
    const session = await getServerSession(options);
    if (session) {
      const dbSession = await getDbSession(session.user?.email!);
      if (dbSession) {
        session.user.dbInfo = dbSession;
      }
      return session;
    }
    throw new Error("Session not found");
  } catch(e) {
    console.log(e);
    throw e;
  }
}*/
// use get session instead of this