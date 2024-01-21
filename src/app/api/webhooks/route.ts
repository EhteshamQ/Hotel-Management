import { createBooking, updateHotelRoom } from "@/lib/api";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const checkoutSessionCompleted = "checkout.session.completed";

export async function POST(req: NextRequest, res: NextResponse) {
  const reqBody = await req.text();

  const sig = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  // console.log(webhookSecret);
  let event: Stripe.Event;
  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(reqBody, sig, webhookSecret);
  } catch (error: any) {
    console.log(error);
    return new NextResponse(`Webhook Error: ${error.message}`, { status: 500 });
  }
  switch (event.type) {
    case checkoutSessionCompleted:
      try {
        const session = event.data.object;
        await createBooking({
          adults: Number(session.metadata?.adults),
          children: Number(session.metadata?.children),
          numberofDays: Number(session.metadata?.numberOfDays),
          totalPrice: Number(session.metadata?.totalPrice),
          discount: Number(session.metadata?.discount),
          checkInDate: session.metadata?.checkinDate!,
          checkOutDate: session.metadata?.checkoutDate!,
          hotelRoom: session.metadata?.hotelRoom!,
          user: session.metadata?.user!,
        });

        await updateHotelRoom(session.metadata?.hotelRoom!);

        return NextResponse.json("Booking Successful", {
          status: 200,
          statusText: "Booking Successful",
        });
      } catch (error) {
        console.log(error);
      }

    default:
      console.log(`unhandled event type ${event.type}`);
  }
  return NextResponse.json("Event Received", {
    status: 200,
    statusText: "Event Received",
  });
}
