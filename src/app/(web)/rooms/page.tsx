"use client";

import RoomCard from "@/components/RoomCard";
import Search from "@/components/Search";
import { getRooms } from "@/lib/api";
import { Room } from "@/models/room";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import LoadingSpinner from "../loading";

const Rooms = () => {
  const searchParams = useSearchParams();
  const [roomTypeFilter, setRoomTypeFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const searchQuery = searchParams.get("searchQuery");
    const roomType = searchParams.get("roomType");
    if (roomType) {
      setRoomTypeFilter(roomType);
    }
    if (searchQuery) {
      setSearchQuery(searchQuery);
    }
  }, []);

  async function fetchData() {
    return getRooms();
  }

  const { data, error, isLoading } = useSWR("get/hotelRooms", fetchData);
  if (isLoading) return <LoadingSpinner />;

  if (error) throw new Error("Failed to fetch data for Rooms");

  if (typeof data == "undefined" && !isLoading) {
    throw new Error("Failed to fetch data");
  }

  const filterRooms = (rooms: Room[]) => {
    return rooms.filter((room) => {
      if (
        roomTypeFilter &&
        roomTypeFilter.toLowerCase() !== "all" &&
        roomTypeFilter.toLowerCase() !== room.type.toLowerCase()
      ) {
        return false;
      }
      if (
        searchQuery &&
        !room.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
        return false;
      return true;
    });
  };

  const filteredRooms = filterRooms(data ?? []);

  return (
    <div className="container mx-auto pt-10 px-2">
      <Search
        roomTypeFilter={roomTypeFilter}
        handleQueryChange={setSearchQuery}
        query={searchQuery}
        handleRoomTypeChange={setRoomTypeFilter}
      />
      <div className="flex mt-20 justify-start flex-wrap gap-20">
        {filteredRooms.map((room) => (
          <RoomCard room={room} key={room._id} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
