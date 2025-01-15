"use server";

import {
  changePasswordDB,
  checkIfActiveUserDB,
} from "../services/forgotPassword.service";
import { hashText } from "../utils/encrypt.utils";
import { logger } from "../utils/logger.utils";

export async function checkIfActiveUser(contact: string) {
  let result;
  try {
    if (contact) {
      contact = contact.replace(/\s+/g, "");
      const user = await checkIfActiveUserDB(contact);
      if (user) {
        // Send OTP Functionality Here
      }

      result = {
        status: user,
        path: !user ? "form" : "",
        msg: !user ? "No Such User Exists! Please Sign Up" : "",
      };
    } else {
      result = {
        status: false,
        path: "contact",
        msg: "Field must not be empty",
      };
    }
  } catch (e) {
    logger.error(e);
    result = {
      status: false,
      path: "form",
      msg: "An Error Occured Please Try Again After Some Time",
    };
  }

  return result;
}

export async function changePassword(
  contact: string,
  password: string,
  repassword: string
) {
  let result;
  try {
    if (password !== repassword) {
      result = {
        status: false,
        path: "password",
        msg: "Passwords do not match",
      };
    } else {
      const hashedPassword = await hashText(password);
      const change = await changePasswordDB(contact, hashedPassword);
      result = {
        status: change,
        path: !change ? "form" : "",
        msg: !change
          ? "Unable To Change Password Please Try Again After Some Time"
          : "",
      };
    }
  } catch (e) {
    logger.error(e);
    result = {
      status: false,
      path: "form",
      msg: "An Error Occured Please Try Again After Some Time",
    };
  }
  return result;
}
