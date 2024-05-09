import React from 'react';
import InputForm from './InputForm';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';


export default async function MyForm() {
  try {
    const session = await getSession();

    if (session) {
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
    console.log(e)
  }
  redirect("/signin");
};

