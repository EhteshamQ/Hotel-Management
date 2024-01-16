import { CreateBookingDTO, Room } from "@/models/room";
import sanityClient from "./sanity";
import * as sanityQueries from "./sanityQueries";
import axios from "axios";

export async function getFeaturedRoom() {
  const result = await sanityClient.fetch<Room>(
    sanityQueries.getFeaturedRoomQuery,
    {},
    {
      cache: "no-cache",
    }
  );
  return result;
}

export async function getRooms() {
  const result = await sanityClient.fetch<Room[]>(
    sanityQueries.getRoomsQuery,
    {},
    {
      cache: "no-cache",
    }
  );
  return result;
}

export async function getRoom(roomSlug: string) {
  const result = await sanityClient.fetch<Room>(
    sanityQueries.getRoomQuery,
    {
      roomSlug: roomSlug,
    },
    {
      cache: "no-cache",
    }
  );

  return { ...result };
}

export const createBooking = async ({
  adults,
  checkInDate,
  checkOutDate,
  children,
  discount,
  hotelRoom,
  totalPrice,
  user,
  numberOfDays,
}: CreateBookingDTO) => {
  const mutation = {
    mutations: [
      {
        creaet: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          numberOfDays,
          checkinDate: checkInDate,
          checkoutDate: checkOutDate,
          discount,
          adults,
          children,
          totalPrice,
        },
      },
    ],
  };

  const { data } = await axios.post(
    `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.api.sanity.io/v2021-10-21/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    mutation,
    {
      headers: {
        Authorization: `Bearer ${process.env.SANITY_STUDIO_TOKEN}`,
      },
    }
  );
  return data;
};
