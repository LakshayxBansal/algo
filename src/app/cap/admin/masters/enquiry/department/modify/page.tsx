import * as React from 'react';
import ModifyDept from './ModifyDept';
import { getAppSession, getSession } from '@/app/services/session.service';

export default async function Page() {

  // const session = await getAppSession();
  const session = await getSession();
  // const session = true

  if (session) {

    return (
      <>
        <ModifyDept></ModifyDept>
      </>
    );
  }

  else {

    return (
      <>
        <h1>401 : Not Authorized</h1>
      </>
    );
  }
}
