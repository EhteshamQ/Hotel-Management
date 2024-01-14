import { Room } from "@/models/room";
import sanityClient from "./sanity";
import * as sanityQueries from "./sanityQueries";

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
