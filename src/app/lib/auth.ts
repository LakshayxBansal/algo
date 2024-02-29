
import excuteQuery from "./db";
import { checkSession, createSession } from "./session";
import {hashText, hashCompare} from "./encrypt";

/**
 * 
 * @param credData {email: string, password:string}
 * @returns 
 */


export async function signIn(credData: any) {

  try {

    // check user
    // check password
    // check session, create if not existing else update the access datetime
    // return true if good else false
    const result = await excuteQuery({
      query: 'select * from user where email=?', 
      values: [credData.email],
    });

    if (result.length > 0) {
      if (await hashCompare(credData.password, result[0].password)) {
        if (!(await checkSession(result[0].userId))){
          return (await createSession({
            userId: result[0].userId,
            name: {
              first: "Dinesh",
              last: "Verma"
            }
          }));
        }
        return true;
      }
    } else {
      return false;
    }
  } catch (e) {
    throw new Error('error in credentials');
  }
}


/**
 * 
 * @param credData {email: string, password:string, firstname: string, lastname: string}
 * @returns 
 */
export async function signUp(userData: any) {

  try {
    const hashedPassword = await hashText(userData.password);

    // check user
    // return true if good else false
    const result = await excuteQuery({
      query: 'insert into user (email, password, firstname, lastname, datetime) values (?, ?, ?, ?, now())', 
      values: [userData.email, hashedPassword, userData.firstname, userData.lastname],
    });

    if (result.constructor.name === "OkPacket") {
        return true;
      }
      return false;
    } catch (e) {
    throw new Error('error in signup');
  }
}

