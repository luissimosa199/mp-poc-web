import MainComponent from "@/components/MainComponent";
import { cookies } from "next/headers";

export default function Home({ params }: { params: { username: string } }) {
  const userAgentCookie = cookies().get("user_agent_id")?.value;

  if (!params.username) {
    return null;
  }

  return (
    <main className="">
      <MainComponent
        user_agent_id={userAgentCookie}
        username={params.username}
      />
    </main>
  );
}
