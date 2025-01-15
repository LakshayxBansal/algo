import React from "react";
import SignIn from './signin/page';
import { initializeApp } from "./utils/firebase.utils";
// import { initializeApp } from "./services/notification.service";
//import { signIn } from "next-auth/react"




export default async function Home() {

  // Return the JSX element for the login page
  //return signIn();
  
  initializeApp();
  return (
    <SignIn></SignIn>
  );
};