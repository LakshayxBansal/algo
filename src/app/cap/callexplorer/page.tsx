import * as React from 'react';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import AutoGrid from './AutoGrid';
import { getCallEnquiries } from '@/app/controllers/callExplorer.controller';
import { logger } from '@/app/utils/logger.utils';
import { getConfigData } from '@/app/controllers/enquiry.controller';

import { Metadata } from 'next';

export const metadata : Metadata = {
  title : 'Call Explorer'
}

export default async function callExplorer() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
        const result = await getCallEnquiries({}, "reset", "", "0", "0", 1, 10,[]);
        const config_data = await getConfigData();
        const regional_setting =JSON.parse(config_data[1].config)?? {};
        return (
          <AutoGrid result={result} regional_setting={regional_setting} />
        );
    }
  } catch (error) {
    logger.error(error);
  }
  redirect("/signin");
}