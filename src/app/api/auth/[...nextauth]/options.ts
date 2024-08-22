import type { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from '../../../services/auth.service';
import { addUser } from '../../../services/user.service';
import { getDbSession } from '../../../services/session.service'
import { dbInfoT } from '../../../models/models';

export const options: NextAuthOptions  = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "username"
        },
        password: { 
          label: "Password", 
          type: "password" 
        },
      },
      async authorize(credentials, req){
        // get the data from the db
        console.log(credentials);
        const user = await authenticateUser({email: credentials?.username, password: credentials?.password});
        if(credentials?.username === user?.email){
          return user;
        } else {
          console.log("user not found");
          return null;
        }
      }
    })
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      let isAllowedToSignIn = true;
      if (account?.provider === "google"){
        const data =  {
          email: user.email as string,
          provider: "google",
          name: user.name as string,
        }
        const result = await authenticateUser(data);
        if (!result){
          //add the user to the db
          const res = await addUser(data);
          if (!res){
            isAllowedToSignIn = false;
          }
        } else {
          isAllowedToSignIn = result?.email === user.email;
        }
      }
      
      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return "false"
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        const sessionDbData = await getDbSession(token?.email as string);
        if (sessionDbData) {
          token.dbInfo = sessionDbData
        }
      }
      return token
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      if (token) {
        if (!token.dbInfo) {
          const dbInfo = await getDbSession(session.user.email as string);
          if (dbInfo) {
            token.dbInfo = dbInfo;
          }
        }
        if (token.dbInfo) {
          session.user.dbInfo = token.dbInfo as dbInfoT;
        }
      }
      return session;
    }
  },
  pages: {
    signIn: '/signin',
  }
}