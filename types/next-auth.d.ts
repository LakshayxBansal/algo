import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import {dbInfoT} from '../src/app/models/models'
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's db data info. */
      dbInfo: dbInfoT,
      userId: number,
    } & DefaultSession["user"]
  }
  // interface User extends DefaultUser {
  //   userId: number;
  //   contact: string;
  //   name: string;
  // }
}