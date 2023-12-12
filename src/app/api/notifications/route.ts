import { MpPushUserAgentModel } from "@/lib/UserAgentModel";
import dbConnect from "@/lib/dbConnect";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: NextRequest) {
  const useCookie = cookies();
  const { userData, name } = await request.json();
  const newId = uuidv4() as string;
  try {
    await dbConnect();

    const userAgent = new MpPushUserAgentModel({
      visits: [userData],
      _id: newId,
      name,
    });

    await userAgent.save();
    useCookie.set("user_agent_id", newId, {
      // httpOnly: process.env.NODE_ENV !== "development",
      // expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
      // sameSite: "strict",
      // path: "/",
    });

    return Response.json({ success: true, message: "userAgent registered" });
  } catch (error) {
    console.error("Error creating UserAgent:", error);
    return Response.json({ error: "Failed to create userAgent" });
  }
}

// TODO: PUT METHOD
export async function PUT(request: Request) {
  const user_agent_cookie = cookies().get("user_agent_id")?.value;

  const { subscription, name } = await request.json();

  if (!user_agent_cookie || !subscription || !name) {
    return Response.json({ error: "Missing required fields" });
  }

  try {
    // Update the UserAgent with the subscription
    await MpPushUserAgentModel.findByIdAndUpdate(user_agent_cookie, {
      PushSubscription: subscription,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: "Internal Server Error" });
  }
}
