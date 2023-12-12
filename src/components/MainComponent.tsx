"use client";

import useServiceWorker from "@/hooks/useServiceWorkers";
import useTrackUserAgent from "@/hooks/useTrackUserAgent";
import React from "react";

const MainComponent = ({
  user_agent_id,
  username,
}: {
  user_agent_id: string | undefined;
  username: string;
}) => {
  useTrackUserAgent(user_agent_id, username);

  const { requestNotificationPermission, unsubscribeFromNotifications } =
    useServiceWorker("/service-worker.js", username);

  const isSubscribed = false;

  const handleClick = isSubscribed
    ? unsubscribeFromNotifications
    : requestNotificationPermission;

  return (
    <div>
      <div>
        {username} ID: {user_agent_id || "INEXISTANT"}
      </div>

      <div>
        <button
          className="border px-4 py-2 shadow-md"
          onClick={handleClick}
        >
          {isSubscribed
            ? "Desactivar Notificaciones"
            : "Activar Notificaciones"}
        </button>
      </div>
    </div>
  );
};

export default MainComponent;
