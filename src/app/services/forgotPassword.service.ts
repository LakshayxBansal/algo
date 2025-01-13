"use server";

import excuteQuery from "../utils/db/db";
export async function checkIfActiveUserDB(contact: string) {
  try {
    const user = await excuteQuery({
      host: "userDb",
      query: "select * from user where contact = ? and active = 1",
      values: [contact],
    });

    if (user.length === 1) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}

export async function changePasswordDB(contact: string, hashedPassword: string) {
  try {
    const change = await excuteQuery({
      host: "userDb",
      query: "update user set password = ? where contact = ?",
      values: [hashedPassword ,contact],
    });


    console.log(change);
    if (change.affectedRows === 1) {
      return true;
    }
  } catch (e) {
    console.log(e);
  }
  return false;
}