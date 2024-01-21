import {
  checkReviewExists,
  createNewReview,
  getUserData,
  updateReview,
} from "@/lib/api";
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

export async function POST(req: NextRequest, res: NextResponse) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return new NextResponse("Invalid Session", {
      status: 500,
      statusText: "Authentication Required",
    });
  }
  const { roomId, reviewText, rating } = await req.json();
  const userId = session.user.id;
  if (!roomId || !reviewText || !rating) {
    return new NextResponse("Invalid Input", {
      status: 403,
      statusText: "Bad Input",
    });
  }
  try {
    const reviewExists = await checkReviewExists({
      userId,
      hotelRoomId: roomId,
    });
    if (!reviewExists) {
      let review = await createNewReview({
        roomId,
        reviewText,
        rating,
        userId,
      });
    } else {
      let updatedReview = await updateReview({
        reviewText,
        rating,
        ratingId: reviewExists._id,
      });
    }
    return new NextResponse("Review Successful", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse("Unable to create review", { status: 500 });
  }
}
