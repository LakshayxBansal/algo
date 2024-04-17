"use server"

import excuteQuery  from '../utils/db/db';

interface IinquiryData {
  name: string,
  add1: string,
  add2: string,
  state: string,
  city: string,
  pin: string
}

export async function createEnquiryDB(crmDb: string, data: IinquiryData) {
  try {

  } catch (e) {
    console.log(e);
  }
  return null;
}
