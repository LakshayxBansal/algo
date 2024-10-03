import * as React from 'react';
import { getSession } from '../../services/session.service';
import { redirect } from 'next/navigation';
import AutoGrid from './AutoGrid';
import { getCallEnquiries } from '@/app/controllers/callExplorer.controller';

export default async function callExplorer() {
  const session = await getSession();
  console.log();
  if (session) {
    const result = await getCallEnquiries({}, "reset", "", "0", "0", 1, 10);
    return (
      <AutoGrid result={result} />
    );
  } else {
    redirect("/signin");
  }
}