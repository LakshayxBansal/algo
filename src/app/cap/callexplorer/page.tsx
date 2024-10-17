import * as React from 'react';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import AutoGrid from './AutoGrid';
import { getCallEnquiries } from '@/app/controllers/callExplorer.controller';
import { logger } from '@/app/utils/logger.utils';

export default async function callExplorer() {
  let path = "";
  try {
    const session = await getSession();
    console.log();
    if (session) {
      if (session.user.dbInfo.roleId) {
        const result = await getCallEnquiries({}, "reset", "", "0", "0", 1, 10);
        return (
          <AutoGrid result={result} />
        );
      } else {
        path = "/company";
      }
    } else {
      path = "/signin";
    }
  } catch (error) {
    logger.error(error);
  }
  redirect(path);
}