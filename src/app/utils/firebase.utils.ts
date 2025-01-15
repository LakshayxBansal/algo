import admin from 'firebase-admin';

export function initializeApp() {
    if (!admin.apps.length) {        
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
    }
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
}