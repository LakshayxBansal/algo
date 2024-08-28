import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from '../../../services/auth.service';
import { addUser, getIdByContact } from '../../../services/user.service';
import { getDbSession } from '../../../services/session.service';
import { dbInfoT, userSchemaT } from '../../../models/models';
// import { Session, User } from 'next-auth';

export const options: NextAuthOptions = {
export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        userContact: {
          label: "User Contact",
          type: "text",
          placeholder: "user email/phone"
        },
        password: {
          label: "Password",
          type: "password"
        },
      },
      async authorize(credentials, req) {
        // get the data from the db
        const user = await authenticateUser({ contact: credentials?.userContact, password: credentials?.password });
        if (credentials?.userContact === user?.contact) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      let isAllowedToSignIn = true;
      if (account?.provider === "google") {
        const data = {
          contact: user.email as string,
          provider: "google",
          name: user.name as string,
        };
        const result = await authenticateUser(data);
        if (!result) {
          //add the user to the db
          const res = await addUser(data as userSchemaT);
          if (!res) {
            isAllowedToSignIn = false;
          }
        } else {
          isAllowedToSignIn = result?.contact === user.email;
        }
      }

      if (isAllowedToSignIn) {
        return true;
      } else {
        // Return false to display a default error message
        return "false";
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ user, token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      let userId: any;
      if (account) {
        if (account?.provider === "google") {
          userId = await getIdByContact(user.email as string);
        }
        else if (account?.provider === "credentials") {
          userId = user.id;
        }
        const sessionDbData = await getDbSession(userId as number);
        if (sessionDbData) {
          token.dbInfo = sessionDbData;
        }
        token.userid = userId;
      }

      return token
    },
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        session.user.userId = token.userid as number;
        if (!token.dbInfo) {
          const dbInfo = await getDbSession(session.userId);
          if (dbInfo) {
            token.dbInfo = dbInfo;
          }
        }
        if (token.dbInfo) {
          session.user.dbInfo = token.dbInfo as dbInfoT;
        }
      }
      console.log("session : ", session);
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
