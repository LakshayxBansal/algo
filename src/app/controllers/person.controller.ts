"use server"

import { redirect } from 'next/navigation';
import * as zs from '../zodschema/zodschema';
import * as mdl from '../models/models';
import {createPersonDB} from '../services/person.service';
import { getAppSession } from '../services/session.service';


export async function createPerson(formData: FormData){

  let userCreated = {status: false, data: {} as mdl.personT, error: {} };
  try {
    const appSession = await getAppSession();

    if(appSession){
      const userData = {firstName: formData.get("firstname") as string,
        lastName: formData.get("lastname") as string,
        email: formData.get("email") as string,
        phone: formData.get("phone") as string,
        add1: formData.get("add1") as string, 
        add2: formData.get("add2") as string,
        city: formData.get("city") as string,
        state: formData.get("state") as string,
        pin: formData.get("pin") as string,
        personType:"contact"
      };
      const result = zs.personSchema.safeParse(userData);
      if(result.success) {
        const person = await createPersonDB(appSession.dbSession?.dbInfo.dbName as string, userData);
        if (person.length >0 ) {
         userCreated = {status: true, data:person[0], error:{}};
        }
      } else {
        userCreated = {status: false, data:{} as mdl.personT, error: result.error};
      }
    }
  } catch (e: any) {
    console.log(e);
  }
  return userCreated;
}