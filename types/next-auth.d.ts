import NextAuth, { DefaultSession } from "next-auth";
import {dbInfoT} from '../src/app/models/models'

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's db data info. */
      dbInfo: dbInfoT,
    } & DefaultSession["user"]
  }
}