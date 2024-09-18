import * as React from 'react';
import { getSession } from '../services/session.service';
import { redirect } from 'next/navigation';
import AutoGrid from './AutoGrid';

export default async function Companies() {
    const session = await getSession();
    console.log();
    if (session) {
        return (
            <AutoGrid />
        );
    } else {
        redirect("/signin");
    }
}