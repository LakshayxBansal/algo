'use server'
import { updateSession } from '../services/session.services';
import { redirect } from 'next/navigation';

export default async function selectUserCompany(row) {
  console.log(row);
  const result = await updateSession(row);
  redirect('/cap')

}