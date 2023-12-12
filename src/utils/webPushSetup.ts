import webPush from "web-push";

webPush.setVapidDetails(
  "mailto:luissimosaarg@gmail.com", // Your email
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY as string, 
  process.env.VAPID_PRIVATE_KEY as string 
);

// NEXT_PUBLIC_VAPID_PUBLIC_KEY=BOINoNDgymZI_-mV3-vB71q1-zvi-rTe8GezByLUdZ4DHpVcQNaHKdiqxGJ7XLeCr39lbc9yzNYMa2lUzNWpVos
// VAPID_PRIVATE_KEY=YPwLE1SIBRMVFPROJEJ5eG-EP_e5zIrBSKiQ8akZPkQ
