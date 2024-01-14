"use client";

import { getRoom } from "@/lib/api";
import { FC } from "react";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import HotelPhotoGallery from "@/components/HotelPhotoGallery";
import { deepEqual } from "assert";

type RoomDetailsType = {
  params: { slug: string };
};

const RoomDetails: FC<RoomDetailsType> = ({ params }) => {
  const fetchRoomData = async () => await getRoom(params.slug);
  // fetchRoomData().then((res) => console.log(res));

  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoomData);

  if (isLoading) return <LoadingSpinner />;
  if (error) throw new Error("Error while fetching room details");
  if (!room || (typeof room == "undefined" && !isLoading)) {
    throw new Error("Failed to fetch data");
  }
  console.log(JSON.stringify(room.images));

  return <HotelPhotoGallery photos={room.images ?? []} />;
};

export default RoomDetails;
