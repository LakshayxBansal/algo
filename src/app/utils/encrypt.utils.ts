'use server'
import * as crypto from "crypto"
import CryptoJS from "crypto-js";

  // Define a secret key and an algorithm
const secretKey = process.env.ENCRYPT_SECRET_KEY as string;
const algorithm = process.env.ENCRYPT_ALGO as string;

// export async function encrypt(data: string){
//   //const secretKeyArr = ArrayBuffer.from(secretKey.encode());
//   const key = crypto.scryptSync(secretKey, 'salt', 32);
//   //const key = Buffer.from (secretKeyArr, 'hex');

//   // Generate a random initialization vector
//   const iv = crypto.randomBytes(16);

//   // Create a cipher object with the key and iv
//   const cipher = crypto.createCipheriv(algorithm, key, iv);

//   // Update the cipher with the data and return the encrypted result
//   const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);

//   // Return the iv and encrypted data as a hex string
//   return iv.toString('hex') + ':' + encrypted.toString('hex');
// }

// export async function decrypt(data: any){
//   // Split the data into iv and encrypted parts
//   const parts = data.split(':');

//   // Convert the parts from hex to buffer
//   const iv = Buffer.from(parts[0], 'hex');
//   const encrypted = Buffer.from(parts[1], 'hex');

//   // Create a decipher object with the key and iv
//   const decipher = crypto.createDecipheriv(<string>algorithm, <string>secretKey, iv);

//   // Update the decipher with the encrypted data and return the decrypted result
//   const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

//   // Return the decrypted data as a string
//   return decrypted.toString();
// }

export async function hashText(data: any) {
    // creating hash object
  const hash = crypto.createHash(<string>process.env.HASH_ALGO).update(data).digest('hex');

  return hash;
}

export async function hashCompare(plainText: any, hash: any){
  const newHash = await hashText(plainText);
  if (hash === newHash){
    return true;
  }
  return false;
}


export async function encrypt(data: string | number) {
  const orgData= data.toString();
  
  const result = CryptoJS.AES.encrypt(orgData, secretKey).toString();
  const urlSafe =encodeURIComponent(result);
  return urlSafe ;
}

export async function decrypt(data: any) {
  const decodedEncryptedId = decodeURIComponent(data);
  const decryptedBytes = CryptoJS.AES.decrypt(decodedEncryptedId, secretKey);
  const originalId = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return originalId;
  
}