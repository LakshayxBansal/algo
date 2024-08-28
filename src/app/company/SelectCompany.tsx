'use server'
import { updateSession } from '../services/session.service';
import { redirect } from 'next/navigation';
import {dbInfoT} from '../models/models';

export default async function selectUserCompany(row: dbInfoT, email: string) {
  const result = await updateSession(row, email);
  if (result) {
    redirect('/cap')
  } else {
    redirect('/error');
  }

}