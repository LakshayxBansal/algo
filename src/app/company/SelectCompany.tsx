'use server'
import { updateSession } from '../services/session.service';
import { redirect } from 'next/navigation';
import {dbInfoT} from '../models/models';

export default async function selectUserCompany(row: dbInfoT, userId: number) {
  const result = await updateSession(row, userId);
  if (result) {
    return true;
  } else {
    redirect('/error');
  }
}

export async function redirectToCap() {
  redirect('/cap');
}