import { MpPushUserAgentModel } from "@/lib/UserAgentModel";
import dbConnect from "@/lib/dbConnect";
import { sendNotificationToUser } from "@/utils/sendNotificationToUser";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const name = request.nextUrl.searchParams.get("name");

  await dbConnect();

  const results = await MpPushUserAgentModel.find({ name: name }).select("_id");

  const agents = results.map((e) => e._id);

  const user_agent_id = "get id";

  const data = await request.json();

  if (!user_agent_id || !name) {
    return Response.json({ error: "missing params" }, { status: 400 });
  }

  const payload = JSON.stringify({
    message: "Notificacion!",
    url: `${process.env.NEXT_PUBLIC_BASE_URL as string}/${encodeURI(name)}`,
  });

  try {
    if (agents.length > 0) {
      await sendNotificationToUser(agents, payload);

      return Response.json({ success: true, data }, { status: 200 });
    }
  } catch (error) {
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
