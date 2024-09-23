'use server'
import { updateSession } from '../services/session.service';
import { redirect,useRouter } from 'next/navigation';
import {dbInfoT} from '../models/models';
import { revalidatePath } from 'next/cache';

export default async function selectUserCompany(row: dbInfoT, userId: number) {
  const result = await updateSession(row, userId);
  if (result) {
    return true;
  } else {
    return false;
  }
}

export async function redirectToPage(url: string) {
  redirect(`${url}`);
}

export async function revalidatePage(url : string) {
  revalidatePath(`${url}`);
}
