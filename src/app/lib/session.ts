'use server'

import excuteQuery from "./db";
import { cookies } from 'next/headers';
import { setSessionCookies, getSessionCookies } from "./cookies";
//import { encrypt, decrypt} from './encrypt';

export async function checkSession(iduser) {
  try {
    const result = await excuteQuery({
      query: 'select * from session where userId=4', 
      values: [],
    });

    if (result.length > 0) {
      // update session last access
      return await updateSessionAccess(iduser);
    }
    return false;
  } catch (e) {
    console.log(e);
    throw new Error('error in checkSession');
  }
}

/**
 * check session from the cookie data. to be called when the user hits the server.
 * @param req 
 * @returns 
 */
export async function checkSessionFromCookie(req) {
  // get cookie from sessionStorage
  const sessionData = await getSessionCookies(req);
  const userId = sessionData? sessionData.userId : null;
  if (await checkSession(userId)){
    return userId;
  } else {
    return 0;
  }
}




export async function createSession(value: any) {
  try {
    const result = await excuteQuery({
      query: 'insert into session (data, userId, last_access) values (?, ?, now())', 
      values: [JSON.stringify(value), value.userId],
    });

    console.log(result);
    if (result.constructor.name === "OkPacket") {
      setSessionCookies({userId: value.userId});      
    }
    return true;

  } catch (e) {
    console.log(e);
    throw new Error('error in credentials');
  }

}

async function getLastSession(idUser){
  // fetch the session id
  try {
    const result = await excuteQuery ({
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
 * @param userId update last_access for the given userId
 * @returns 
 */
async function updateSessionAccess(userId){
  try {
    const result = await excuteQuery({
      query: 'update session set last_access=now() where userId=?', 
      values: [userId],
    });
    // update the cookie as well
    setSessionCookies({userId: userId});     
  
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
}