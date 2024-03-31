"use server"
 
import { cookies } from 'next/headers';
//import { encrypt, decrypt } from './encrypt';
 
export async function setSessionCookies(sessionData: any) {
  "use server"
  //const encryptedSessionData = await encrypt(sessionData.toString()); // Encrypt your session data
  const encryptedSessionData = JSON.stringify(sessionData);
  try {
    cookies().set(<string>'session', <string>encryptedSessionData, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // One week
      path: '/',
    })
  } catch(e) {
    console.log(e);
  }
  // Redirect or handle the response after setting the cookie
}


export async function getSessionCookies() {
  const encryptedSessionData = cookies().get('session')?.value;
  //return encryptedSessionData ? JSON.parse(await decrypt(encryptedSessionData)) : null;
  return encryptedSessionData ? JSON.parse(encryptedSessionData) : null;
}