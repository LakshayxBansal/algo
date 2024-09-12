import * as React from 'react';
import { getSession }  from '../services/session.service';
import { redirect } from 'next/navigation';
import { CompanyEntityList } from './CompanyEntityList';

export default async function Companies() {
  const session = await getSession();
  console.log(session);
  if (session) {
    return (
      <>
      <h1>Company List</h1>
      <CompanyEntityList/>
      <h1>Invite List</h1>
      
      </>
    );
  } else {
    redirect("/signin");
  }
}