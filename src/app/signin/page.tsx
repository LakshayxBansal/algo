import React, { FormEvent } from "react";
import { getProviders } from "next-auth/react";
import AuthPage from "./signInForm";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'Sign In'
}


export default async function SignIn() {
  const providerArr = Object.values((await getProviders())!).filter(
    (provider) => provider.name !== "Credentials"
  );

  return <AuthPage providers={providerArr}></AuthPage>;
}