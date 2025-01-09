import admin from 'firebase-admin';

export function initializeApp() {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
}


export const sendNotificationToTopic = async (topic: string, title: string, body: string) => {
    const message = {
      notification: {
        title,
        body,
      },
      topic,
    };
  
    try {
      const response = await admin.messaging().send(message);
      console.log("Notification sent to topic:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  
