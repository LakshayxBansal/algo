import React from 'react';
import InputForm from './InputForm';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import { getScreenDescription } from '@/app/controllers/object.controller';
// import {logger} from '@/app/utils/logger.utils';


export default async function MyForm() {
  try {
    const session = await getSession();
    let desc = await getScreenDescription(26);
    console.log(desc);


    if (session) {
      // logger.info('form open : user '+ session.user.email)
      const masterData = {
        userName: session.user?.name as string,
      }

      return (
        <InputForm
          desc={desc}
          baseData={masterData}
        ></InputForm>
      );
    }
  } catch (e) {
    // show error page
    // logger.error(e)
  }
  redirect("/signin");
};

