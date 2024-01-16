"use client";

import HotelPhotoGallery from "@/components/HotelPhotoGallery";
import { getRoom } from "@/lib/api";
import { FC, useState } from "react";
import { MdOutlineCleaningServices } from "react-icons/md";
import { LiaFireExtinguisherSolid } from "react-icons/lia";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { AiOutlineMedicineBox } from "react-icons/ai";
import { GiSmokeBomb } from "react-icons/gi";
import BookRoomCTA from "@/components/BookRoomCTA";

type RoomDetailsType = {
  params: { slug: string };
};

const RoomDetails: FC<RoomDetailsType> = ({ params }) => {
  const fetchRoomData = async () => await getRoom(params.slug);
  const { data: room, error, isLoading } = useSWR("/api/room", fetchRoomData);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [adults, setAdults] = useState<number>(1);
  const [childrenNumber, setChildrenNumber] = useState<number>(0);

  if (isLoading) return <LoadingSpinner />;
  if (error) throw new Error("Error while fetching room details");
  if (!room || (typeof room == "undefined" && !isLoading)) {
    throw new Error("Failed to fetch data");
  }

  const getMinCheckoutDate = () => {
    if (!checkInDate) return null;
    const nextDay = new Date(checkInDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  };

  return (
    <div>
      <HotelPhotoGallery photos={room.images ?? []} />
      <div className="container mx-auto mt-20 ">
        <div className="md:grid md:grid-cols-12 gap-10 px-3">
          <div className="md:col-span-8 md:w-full">
            <div>
              <h2 className="font-bold text-left text-lg md:text-2xl">
                {room.name} {room.dimension ? `(${room.dimension})` : ""}
              </h2>
              <div className="flex my-11">
                {room.offeredAmenities.map((amenity) => (
                  <div
                    key={amenity._key}
                    className="md:w-44 text-center px-2 md:px-0 h-20 md:h-40 mr-3 bg-[#eff0f2] dark:bg-gray-800 rounded-lg grid place-content-center"
                  >
                    <i className={`fa-solid ${amenity.icon} md:text-2xl`}></i>
                    <p className="text-xs md:text-base pt-3">
                      {amenity.amenity}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mb-11 ">
                <h2 className="font-bold text-3xl mb-2">Description</h2>
                <p>{room.description}</p>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Offered Amenities</h2>
                <div className="grid grid-cols-2">
                  {room.offeredAmenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center md:my-0 my-1"
                    >
                      <i className={`fa-solid ${amenity.icon} mt-3`}></i>
                      <p className="text-xs md:text-base pt-3 ml-2">
                        {amenity.amenity}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-11">
                <h2 className="font-bold text-3xl mb-2">Safety and Hygiene</h2>
                <div className="grid grid-cols-2">
                  <div className="flex items-center my-1 md:my-0">
                    <MdOutlineCleaningServices />
                    <p className="ml-2 md:text-base text-xs">Daily Cleaning</p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <LiaFireExtinguisherSolid />
                    <p className="ml-2 md:text-base text-xs">
                      Fire Extinguishers
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <AiOutlineMedicineBox />
                    <p className="ml-2 md:text-base text-xs">
                      Daily Disinfections and Steralizations
                    </p>
                  </div>
                  <div className="flex items-center my-1 md:my-0">
                    <GiSmokeBomb />
                    <p className="ml-2 md:text-base text-xs">Smoke Detectors</p>
                  </div>
                </div>
              </div>

              <div className="shadow dark:shadow-white  rounded-lg p-6">
                <div className="items-center mb-4">
                  <p className="md:text-lg font-semibold">Customer Reviews</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/*Reviews*/}
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-4 rounded-xl shadow-lg dark:shadow dark:shadow-white sticky h-fit to-10% overflow-auto ">
            <BookRoomCTA
              price={room.price ?? 0}
              discount={room.discount ?? 0}
              specialNote={room.specialNote}
              checkInDate={checkInDate}
              setCheckInDate={setCheckInDate}
              checkOutDate={checkOutDate}
              setCheckOutDate={setCheckOutDate}
              getMinCheckoutDate={getMinCheckoutDate}
              adults={adults}
              childrenNumber={childrenNumber}
              setAdults={setAdults}
              setChildrenNumber={setChildrenNumber}
              isBooked={room.isBooked}
              slug={room.slug.current}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
