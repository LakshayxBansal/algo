"use server"

import excuteQuery  from '../utils/db/db';

interface companyDataT {
  name: string,
  add1: string,
  add2: string,
  state: string,
  city: string,
  pin: string
}

export async function createCustomerDB(crmDb: string, custData: companyDataT) {
  try {
    return excuteQuery({
      host: crmDb,
      query: "insert into customer (nameVal, add1, add2, city, state, pincode, date_time, active) values \
      (?,?,?,?,?,?,now(),1) returning *",
      values: [
        custData.name,
        custData.add1,
        custData.add2,
        custData.city,
        custData.state,
        custData.pin
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}
