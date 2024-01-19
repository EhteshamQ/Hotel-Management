"use client";

import { getUserBookings } from "@/lib/api";
import { User } from "@/models/room";
import axios from "axios";
import Image from "next/image";
import { FC, useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";
import useSWR from "swr";
import LoadingSpinner from "../../loading";
import { signOut } from "next-auth/react";
import { BsJournalBookmarkFill } from "react-icons/bs";

type UserProfileType = {
  params: { id: string };
};

const UserProfile: FC<UserProfileType> = ({ params: { id } }) => {
  const fetchUserBooking = async () => {
    const data = await getUserBookings(id);
    return data;
  };
  const fetchUserData = async () => {
    const { data } = await axios.get<User>("/api/users");
    return data;
  };

  const {
    data: bookingData,
    error: bookingError,
    isLoading: loadingBookings,
  } = useSWR("/api/userbooking", fetchUserBooking);

  const {
    data: userData,
    error: userDataError,
    isLoading: userDataLoading,
  } = useSWR("/api/users", fetchUserData);

  const [currentNav, setCurrentNav] = useState<
    "bookings" | "amount" | "ratings"
  >("bookings");

  if (loadingBookings || userDataLoading) return <LoadingSpinner />;
  if (bookingError || userDataError)
    throw new Error("Error while fetching room details");
  if (
    !bookingData ||
    (typeof bookingData == "undefined" && !loadingBookings) ||
    !userData ||
    (typeof userData == "undefined" && !userDataLoading)
  ) {
    throw new Error("Failed to fetch data");
  }

  return (
    <div className="container mx-auto px-2 md:px-2 py-10">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="hidden md:block md:col-span-4 lg:col-span-3 shadow-lg h-fit sticky top-10 bg-[#eff0f2] text-black rounded-lg px-6 py-4">
          <div className="md:w-[143px] w-38 h-28 md:h-[143px] mx-auto mb-5 rounded-full  overflow-hidden">
            <Image
              src={userData?.image ?? "/images/avatar.png"}
              alt={userData?.name}
              width={143}
              height={143}
              className="img scale-animation rounded-full"
            />
          </div>
          <div className="font-normal py-4 text-left">
            <h6 className="text-xl font-bold pb-3">About</h6>
            <p className="text-sm">{userData?.about ?? ""}</p>
          </div>
          <div className="font-normal text-left">
            <h6 className="text-xl font-bold pb-3">{userData.name}</h6>
          </div>
          <div className="flex items-center">
            <p className="mr-2">Sign Out</p>
            <FaSignOutAlt
              className="text-3xl cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
        </div>

        <div className="md:col-span-8 lg:col-span-9">
          <div className="flex items-center">
            <h5 className="text-2xl font-bold mr-3">Hello , {userData.name}</h5>
          </div>
          <div className="md:hidden w-14 h-14 rounded-l-full overflow-hidden">
            <Image
              className="img scale-animation rounded-full"
              width={56}
              height={56}
              src={userData?.image ?? "/images/avatar.png"}
              alt="user Name"
            />
          </div>
          <p className="block w-fit md:hidden text-sm py-2">{userData.about}</p>
          <p className="text-sm py-2 font-medium">
            Joined In {userData._createdAt.split("T")[0]}
          </p>
          <div className="md:hidden flex items-center my-2">
            <p className="mr-2">Sign Out</p>
            <FaSignOutAlt
              className="text-3xl cursor-pointer"
              onClick={() => signOut({ callbackUrl: "/" })}
            />
          </div>
          <nav className="sticky top-0 px-2 w-fit mx-auto md:w-full md:px-5 py-3 mb-8 text-gray-700 border border-gray-300  rounded-lg mt-7">
            <ol
              className={`${
                currentNav === "bookings" ? "text-blue-600" : "text-gray-700"
              } inline-flex mr-1 md:mr-5 items-center space-x-1 md:space-x-3`}
            >
              <li
                className="inline-flex items-center cursor-pointer"
                onClick={() => setCurrentNav("bookings")}
              >
                <BsJournalBookmarkFill />
                <a className="inline-flex items-center mx-1 md:mx03 text-xs md:text-sm font-medium">
                  Current Bookings
                </a>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
