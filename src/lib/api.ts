import { Booking, CreateBookingDTO, Room, User } from "@/models/room";
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
  numberofDays,
}: CreateBookingDTO) => {
  const mutation = {
    mutations: [
      {
        create: {
          _type: "booking",
          user: { _type: "reference", _ref: user },
          hotelRoom: { _type: "reference", _ref: hotelRoom },
          numberofDays,
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

export const updateHotelRoom = async (hotelRoomId: string) => {
  const mutation = {
    mutations: [
      {
        patch: {
          id: hotelRoomId,
          set: {
            isBooked: true,
          },
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

export const getUserBookings = async (userId: string) => {
  const result = await sanityClient.fetch<Booking[]>(
    sanityQueries.getUserBookingsQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
};

export const getUserData = async (userId: string) => {
  const result = await sanityClient.fetch<User>(
    sanityQueries.getUserDataQuery,
    { userId },
    { cache: "no-cache" }
  );

  return result;
};
