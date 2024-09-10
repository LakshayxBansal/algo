import * as React from 'react';
import { getSession }  from '../../../services/session.service';
import { redirect } from 'next/navigation';
import InviteList from './InviteList';

export default async function Companies() {
  const session = await getSession();
  if (session) {
    return (
      <InviteList/>
    );
  } else {
    redirect("/signin");
  }
}