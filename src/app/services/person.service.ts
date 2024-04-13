"use server"

import excuteQuery  from '../utils/db/db';
import * as z from '../zodschema/zodschema';


export async function createPersonDB(crmDb: string, personData: z.personT) {
  try {
    return excuteQuery({
      host: crmDb,
      query: "insert into person (firstName, lasName, add1, add2, city, state, phone1, email, personTypeId) \
      (select ?, ?, ?, ?, ?, ?, ?, ?,  personTypeId from personType t where t.nameVal=?) returning *",
      values: [
        personData.firstName, 
        personData.lastName, 
        personData.add1, 
        personData.add2, 
        personData.city, 
        personData.state, 
        personData.phone, 
        personData.email, 
        personData.personType
      ],
    });
  } catch (e) {
    console.log(e);
  }
  return null;
}

