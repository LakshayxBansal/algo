import * as React from 'react';
import AddDeptForm from './AddDeptForm';
import { getSession } from '@/app/services/session.service';

export default async function Page() {

  // const session = await getAppSession();
  const session = await getSession();

  if (session) {

    return (
      <>
        <AddDeptForm></AddDeptForm>
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
