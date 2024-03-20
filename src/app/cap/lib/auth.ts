
import { excuteQuery } from "./db";
import {hashText, hashCompare} from "./encrypt";

/**
 * 
 * @param credData {email: string, password:string}
 * @returns 
 */


export async function authenticateUser(credData: any) {

  try {

    // check user
    // check password
    // check session, create if not existing else update the access datetime
    // return true if good else false
    const result = await excuteQuery({
      query: 'select * from user, role where email=? and user.roleId = role.roleId', 
      values: [credData.email],
    });

    if (result.length > 0) {
      if (await hashCompare(credData.password, result[0].password)) {
        const user = {
          id: result[0].userId,
          email: result[0].email,
          name: result[0].firstName + " " +result[0].lastName,
        };
        return user;
        /*if (!(await checkSession(result[0].userId))){
          return (await createSession(user));
        };*/
      }
    } 
  } catch (e) {
    console.log(e);
  }
  return null;
}


/**
 * 
 * @param credData {email: string, password:string, firstname: string, lastname: string}
 * @returns 
 
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
*/
