import * as React from 'react';
import { getSession }  from '../services/session.service';
import { redirect } from 'next/navigation';
import { CompanyEntityList } from './CompanyEntityList';

export default async function Companies() {
  const session = await getSession();

  if (session) {
    console.log(session)
    const rows:dbInfoT[] = await getCompanyList(session.user?.userId);
    return (
      <CompanyEntityList/>
    );
  } else {
    redirect("/signin");
  }
}