import { useCallback, useEffect } from "react";
const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;

const useServiceWorker = (
  swPath: string,
  name: string
): {
  requestNotificationPermission: () => Promise<void>;
  unsubscribeFromNotifications: () => Promise<void>;
} => {
  function urlBase64ToUint8Array(base64String: string) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, "+")
      .replace(/_/g, "/");

    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey as string);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(swPath)
        .then((registration) => {
          return;
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }
  }, [swPath]);

  const requestNotificationPermission = useCallback(async () => {
    try {
      const permission = await Notification.requestPermission();

      if (permission === "granted" && "serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey,
        });

        // save user data in db
        const response = await fetch("api/notifications", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscription,
            name,
          }),
        });

        const data = await response.json();
        console.log("useServiceWorker", data);

        if (data.success) {
          console.log("Successfully subscribed!");
        } else {
          console.error("Error subscribing:", data.error);
        }
      }
    } catch (err) {
      console.error("Push subscription failed:", err);
    }
  }, [convertedVapidKey, name]);

  const unsubscribeFromNotifications = useCallback(async () => {
    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (subscription) {
          await subscription.unsubscribe();

          const response = await fetch("/api/chatSubscription", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
            }),
          });

          const data = await response.json();

          if (data.success) {
            console.log("Successfully unsubscribed!");
          } else {
            console.error("Error unsubscribing:", data.error);
          }
        }
      }
    } catch (err) {
      console.error("Push unsubscription failed:", err);
    }
  }, [name]);

  return { requestNotificationPermission, unsubscribeFromNotifications };
};

export default useServiceWorker;
