import { getProviders } from "next-auth/react";
import SignupForm from "./signUpForm";
import { Metadata } from "next";

export const metadata : Metadata = {
  title : 'Sign Up'
}

export default async function SignUp() {
  const providerArr = Object.values((await getProviders())!).filter(
    (provider) => provider.name !== "Credentials"
  );
  return <SignupForm provider={providerArr} />;
}