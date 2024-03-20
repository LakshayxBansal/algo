'use server'

import { signIn } from "next-auth/react";

export async function handleSubmit(event) {
  signIn("credentials", { redirect: false, username: "jsmith", password: "1234" });
};

export async function checkEmail(email: any) {
  console.log(email);
};

