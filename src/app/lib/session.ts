"use server"

import excuteQuery from "./db";
import { cookies } from 'next/headers';
import { redirect   } from 'next/navigation';
import { setSessionCookies, getSessionCookies } from "./cookies";
//import { encrypt, decrypt} from './encrypt';

export async function checkSession(iduser) {
  try {
    const result = await excuteQuery({
      query: 'select * from session where userId=?', 
      values: [iduser],
    });

    if (result.length > 0) {
      // update session last access
      //await updateSessionAccess(iduser);
      return result[0].data;
    }
    return null;
  } catch (e) {
    console.log(e);
    throw new Error('error in checkSession');
  }
}

/**
 * check session from the cookie data. to be called when the user hits the server.
 * @param 
 * @returns 
 */
export async function getSession(openSignIn=true) {
  // get cookie from sessionStorage
  const sessionData = await getSessionCookies();
  const result = (sessionData? sessionData.token : null)? await checkSession(sessionData.token) : null;
  if (result){
    return result;
  } else {
    //const url = new URL(`/SignIn`, req.url);
    if (openSignIn) {
      return redirect("/SignIn");
    }
  }
  return null;
}




export async function createSession(value: any) {
  try {
    const result = await excuteQuery({
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
    setSessionCookies({token: userId});     
  
    return true;
  } catch(e) {
    console.log(e);
    return false;
  }
}