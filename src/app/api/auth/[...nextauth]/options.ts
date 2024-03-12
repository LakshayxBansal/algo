import type { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from '../../../lib/auth'

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
        const user = await authenticateUser({email: credentials?.username, password: credentials?.password});
        if(credentials?.username === user?.email){
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  //pages: {
    //signIn: '/SignIn',
  //}
}