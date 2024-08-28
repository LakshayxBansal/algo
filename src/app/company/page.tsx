import * as React from 'react';
import { getSession }  from '../services/session.service';
import { redirect } from 'next/navigation';
import { CompanyEntityList } from './CompanyEntityList';

export default async function Companies() {
  const session = await getSession();

  if (session) {        
    return (
      <CompanyEntityList/>
    );
  } else {
    redirect('/signin');
  }
}