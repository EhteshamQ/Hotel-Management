import { getRoom } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

type RequestData = {
  hotelRoomSlug: string;
  checkinDate: string;
  checkoutDate: string;
  adults: number;
  children: number;
  //   totalPrice: number;
  //   discount: number;
  numberOfDays: number;
};

export async function POST(req: NextRequest, res: NextResponse) {
  const {
    adults,
    children,
    checkinDate,
    checkoutDate,
    numberOfDays,
    hotelRoomSlug,
  }: RequestData = await req.json();
  if (
    !checkinDate ||
    !checkoutDate ||
    !hotelRoomSlug ||
    !numberOfDays ||
    !adults
  ) {
    return new NextResponse("All Fields are required", { status: 400 });
  }
  const origin = req.headers.get("origin");
  const session = await getServerSession(authOptions);
  // console.log(session);
  if (!session) {
    return new NextResponse("Authentication Required", { status: 400 });
  }
  const userId = session.user.id;
  const formattedCheckoutDate = checkoutDate.split("T")[0];
  const formattedCheckintDate = checkinDate.split("T")[0];

  try {
    const room = await getRoom(hotelRoomSlug);
    const discountedPrice = room.price - (room.price / 100) * room.discount;
    const totalPrice = discountedPrice * numberOfDays;
    const stripeSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: {
              name: room.name,
              images: room.images.map((img) => img.url),
            },
            unit_amount: parseInt((totalPrice * 100).toFixed(2)),
            // unit_amount: parseInt(totalPrice * 100).toString(),
          },
        },
      ],
      payment_method_types: ["card"],
      success_url: `${origin}/users/${userId}`,
      metadata: {
        adults,
        children,
        checkinDate: formattedCheckintDate,
        checkoutDate: formattedCheckoutDate,
        hotelRoom: room._id,
        numberOfDays,
        totalPrice,
        user: userId,
        discount: room.discount,
      },
    });
    return new NextResponse(JSON.stringify(stripeSession), {
      status: 200,
      statusText: "Payment Session created",
    });
  } catch (error) {
    console.log(" Payment failed", error);

    return new NextResponse(JSON.stringify(error), { status: 400 });
  }
}
