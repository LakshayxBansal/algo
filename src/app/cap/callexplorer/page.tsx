import * as React from 'react';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import AutoGrid from './AutoGrid';
import { getCallEnquiries } from '@/app/controllers/callExplorer.controller';
import { logger } from '@/app/utils/logger.utils';

export default async function callExplorer() {
  try {
    const session = await getSession();
    if (session) {
        const result = await getCallEnquiries({}, "reset", "", "0", "0", 1, 10,[]);
        return (
          <AutoGrid result={result} />
        );
    }
  } catch (error) {
    logger.error(error);
  }
  redirect("/signin");
}