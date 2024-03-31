import type { NextAuthOptions, User } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { authenticateUser } from '../../../services/auth.services';
import { addUser } from '../../../services/user.services';
import { getDbSession } from '../../../services/session.services';

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
        const names: string[] = user.name?.split(' ',2) ?? ['', '']; 
        const data =  {
          email: user.email,
          provider: "google",
          firstname: names[0],
          lastname: names[1],
        }
        const result = await authenticateUser(data);
        if (!result){
          //add the user to the db
          const res = await addUser(data);
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
    } /*,
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
        const sessionDbData = await getDbSession(session.email);
        const retVal = { ...session, moreInfo: sessionDbData?? {}}
        
        return retVal;
    }*/
  },
  pages: {
    signIn: '/SignIn',
  }
}