import * as React from 'react';
import { getSession }  from '../../../services/session.service';
import { redirect } from 'next/navigation';
import UserList from './UserList';
import InviteList from './InviteList';

export default async function CompanyUser() {
  const session = await getSession();
  if (session) {
    return (
      <>
      <UserList/>
      <InviteList/>
      </>
    );
  } else {
    redirect("/signin");
  }
}