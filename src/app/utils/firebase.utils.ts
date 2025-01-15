import admin from 'firebase-admin';

export function initializeApp() {
    if (!admin.apps.length) {        
        admin.initializeApp({
          credential: admin.credential.applicationDefault(),
          projectId: "algofast-crm-prod"
        });
    }
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
}