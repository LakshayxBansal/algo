import React from 'react';
import InputForm from './InputForm';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import {logger} from '@/app/utils/logger.utils';


export default async function MyForm() {
  try {
    const session = await getSession();

    if (session) {
      logger.info('form open : user '+ session.user.email)
      const masterData = {
        userName: session.user?.name as string,
      }
      
      return (
        <InputForm 
          baseData={masterData}
        ></InputForm>
      );
    }
  } catch (e) {
    // show error page
    logger.error(e)
  }
  redirect("/signin");
};

