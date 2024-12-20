"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
    signOut({ callbackUrl: 'http://localhost:3000/signin' });
    return (
        <h1>Sign out page</h1>
    )
}
