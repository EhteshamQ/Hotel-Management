import { getRoomReviews } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) {
  try {
    let roomId = params.id;
    if (!roomId)
      return new NextResponse("Room Id is needed to fetch reviews", {
        status: 400,
      });
    let reviews = await getRoomReviews(roomId);
    return NextResponse.json(reviews, {
      status: 200,
      statusText: "Successfully fetched data",
    });
  } catch (error) {
    console.log("Error", error);
    return new NextResponse("Issue while fetching reviews", { status: 500 });
  }
}
