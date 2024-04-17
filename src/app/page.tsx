import React from "react";
import SignIn from './signin/page';
//import { signIn } from "next-auth/react"




export default function Home() {

  // Return the JSX element for the login page
  //return signIn();
  return (
    <SignIn></SignIn>
  );
};