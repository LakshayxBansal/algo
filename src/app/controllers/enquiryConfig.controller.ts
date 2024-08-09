'use server'
import { getSession } from '../services/session.service';


export async function getEnquiryConfig() {
  try {
    const session = await getSession();
    if (session?.user.dbInfo) {
      return getEnquiryConfigList(session.user.dbInfo.dbName);
    }
  } catch (e) {
    console.log(e);
  }
}