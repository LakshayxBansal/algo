'use server'

import excuteQuery from '../utils/db/db';
import { getServerSession } from "next-auth/next"
import { options } from '../api/auth/[...nextauth]/options';
import { Session } from 'next-auth';

const sessionDb = 'userDb';

interface dbSesstionT {
  dbInfo: {
    companyId:number,
    nameVal: string,
    dbId: number,
    email: string,
    host: string,
    port: string,
    dbName:string
  }
};

export interface appSessionT {
  session: Session;
  dbSession: dbSesstionT | null;
};

export async function getDbSession(email: string): Promise<dbSesstionT | null> {
  try {

    const result = await excuteQuery({
      host: sessionDb,
      query: 'select * from session where email=?', 
      values: [email],
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
export async function updateSession(dbInfo: any){
  try {
    let dbData = await getDbSession(dbInfo.email);
    if (dbData) {
      dbData.dbInfo = dbInfo;
      const json = JSON.stringify(dbData);
      const result = await excuteQuery({
        host: sessionDb,
        query: 'update session set data=?, last_access=now() where email=?', 
        values: [json, dbInfo.email],
      });
      return result;
    } else {
      dbData = {dbInfo: dbInfo}
      const json = JSON.stringify(dbData);
      const result = await excuteQuery({
        host: sessionDb,
        query: 'insert into session (data, last_access, email) values (?, now(), ?);', 
        values: [json, dbInfo.email],
      });
      return result;
    }
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
      return session;
    }
  } catch(e) {
    console.log(e);
  }
  return null;
}

/**
 * server function to return the session object at the server
 */
export async function getAppSession(): Promise<{session: Session , dbSession: dbSesstionT|null} | null> {
  try {
    const session = await getServerSession(options);
    if (session) {
      const dbSession = await getDbSession(session.user?.email!);
      if (dbSession) {
        const appSession = {
          session: session,
          dbSession: dbSession
        }
        return appSession;
      }
    }
    throw new Error("Session not found");
  } catch(e) {
    console.log(e);
    throw e;
  }
}