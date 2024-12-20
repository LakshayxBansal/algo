import * as React from 'react';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import { logger } from '@/app/utils/logger.utils';
import FieldConfigurator from './createCustomFields';
import { Metadata } from 'next';

export const metadata : Metadata = {
  title : 'Field Configurator'
}

export default async function formFieldsConfiguration() {
  try {
    const session = await getSession();
    if (session) {
      return (
        <FieldConfigurator />
      );
    }
  } catch (error) {
    logger.error(error);
  }
  redirect("/signin");
}