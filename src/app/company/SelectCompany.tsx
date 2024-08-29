'use server'
import { updateSession } from '../services/session.service';
import { redirect } from 'next/navigation';
import {dbInfoT} from '../models/models';

export default async function selectUserCompany(row: dbInfoT, userId: number) {
  console.log(row);
  const result = await updateSession(row, userId);
  if (result) {
    redirect('/cap')
  } else {
    redirect('/error');
  }

}