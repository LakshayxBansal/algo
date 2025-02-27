import admin from 'firebase-admin';


export const sendNotificationToTopic = async (topic: string, title: string, body: string, type: string) => {
    const message = {
      notification: {
        title,
        body,
      },
      topic,
      data: {
        type,
      }
    };
  
    try {            
      const response = await admin.messaging().send(message);
      console.log("Notification sent to topic:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  };
  
