import { getUserData } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Invalid Session", {
      status: 500,
      statusText: "Authentication Required",
    });
  }

  const userId = session.user.id;
  try {
    const data = await getUserData(userId);
    return NextResponse.json(data, { status: 200, statusText: "Success" });
  } catch (error) {
    console.log(error);
    return new NextResponse("Error while fetching user data", { status: 400 });
  }
}
