import admin from 'firebase-admin';

export function initializeApp() {
    if (!admin.apps.length) {
        console.log('firebase');
        
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
        });
    }
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
}