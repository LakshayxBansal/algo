"use server"

import { getServerSession } from "next-auth/next"
import { options } from '../../api/auth/[...nextauth]/options';


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