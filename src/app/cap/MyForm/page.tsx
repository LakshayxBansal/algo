import React from 'react';
import InputForm from './InputForm';
import { getSession } from '../../services/session.service';
import { getIquiryPageData } from '../../controllers/inquiry.controller';
import { redirect } from 'next/navigation';


export default async function MyForm() {
  try {
    const session = await getSession();

    if (session) {
      const result = await getIquiryPageData();
      const masterData = {
        userName: session.user?.name as string,
        salesPerson: result?.salesPerson,
        catList: result?.catList,
        ticketStages: result?.ticketStages,
        customer: result?.customer,
        person: result?.person,
        action: result?.action
      }
      
      return (
        <InputForm 
          baseData={masterData}
        ></InputForm>
      );
    }
  } catch (e) {
    // show error page
    redirect("/error");
  }
};

