import React from "react";
import { Metadata } from "next";
import { decrypt } from "../utils/encrypt.utils";
import ResetPasswordForm from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
};

interface searchParamsProps {
  searchParams: { [key: string]: string | undefined };
}

export default async function ResetPassword({
  searchParams,
}: searchParamsProps) {
  const contact = await decrypt(searchParams.contact);

  return <ResetPasswordForm contact={contact} />;
}
