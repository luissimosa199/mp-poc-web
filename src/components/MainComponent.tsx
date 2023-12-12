"use client";

import useServiceWorker from "@/hooks/useServiceWorkers";
import useTrackUserAgent from "@/hooks/useTrackUserAgent";
import React from "react";
import useSWR from "swr";
import Header from "./Header";
import Panel from "./Panel";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

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

  const { data, isLoading } = useSWR(`api/notifications`, fetcher);

  const isSubscribed = data.isSubscribed;

  const handleClick = isSubscribed
    ? unsubscribeFromNotifications
    : requestNotificationPermission;

  return (
    <div>
      <Header username={username} />
      <Panel
        isSubscribed={isSubscribed}
        isLoading={isLoading}
        handleClick={handleClick}
      />
    </div>
  );
};

export default MainComponent;
