'use server'
import { updateSession } from '../services/session.service';
import { redirect } from 'next/navigation';
import {companyInfo} from './companyInfo';

export default async function selectUserCompany(row: companyInfo) {
  console.log(row);
  const result = await updateSession(row);
  if (result) {
    redirect('/cap')
  } else {
    redirect('/error');
  }

}