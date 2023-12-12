import { MpPushUserAgentModel } from "@/lib/UserAgentModel";
import dbConnect from "@/lib/dbConnect";
import webPush from "web-push";

export async function sendNotificationToUser(
  agents: string[],
  payload: string
) {
  for (const id of agents) {
    try {
      await dbConnect();

      const user = await MpPushUserAgentModel.findById(id);

      if (!user || !user.PushSubscription) {
        console.error(`\n User ${id} not found or not subscribed \n`);
        continue; // Skip to the next user
      }

      const pushConfig = {
        endpoint: user.PushSubscription.endpoint,
        keys: {
          auth: user.PushSubscription.keys.auth,
          p256dh: user.PushSubscription.keys.p256dh,
        },
      };

      const parsedUrl = new URL(user.PushSubscription.endpoint);
      const audience = `${parsedUrl.protocol}//${parsedUrl.hostname}`;

      const vapidHeaders = webPush.getVapidHeaders(
        audience,
        "mailto:luissimosaarg@gmail.com",
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string,
        process.env.VAPID_PRIVATE_KEY as string,
        "aes128gcm"
      );

      await webPush.sendNotification(pushConfig, payload, {
        headers: vapidHeaders,
      });
    } catch (error) {
      console.error(`Error sending notification to user ${id}:`, error);
    }
  }
}
