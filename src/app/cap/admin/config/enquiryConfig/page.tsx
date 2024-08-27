import React from 'react';
import { getSession } from '@/app/services/session.service';
import { redirect } from 'next/navigation';
import {logger} from '@/app/utils/logger.utils';
import {EnquiryOptions} from './enquiryOptions';
import {getEnquiryConfig} from '@/app/controllers/enquiryConfig.controller';


export default async function EnquiryConfig() {
  try {
    const session = await getSession();
    const entityData = await getEnquiryConfig();

    if (session) {
      logger.info('form open : user '+ session.user.email);
      const masterData = {
        userName: session.user?.name as string,
      }
      
      return (
        <EnquiryOptions
          baseData={entityData}
        ></EnquiryOptions>
      );
    }
  } catch (e) {
    // show error page
    logger.error(e)
  }
  redirect("/signin");
};

