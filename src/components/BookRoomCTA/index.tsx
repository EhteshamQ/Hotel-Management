"use client";
import { getStripe } from "@/lib/stripe";
import axios from "axios";
import { FC, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";

type BookRoomCTAProps = {
  price: number;
  discount: number;
  specialNote: string;
  checkOutDate: Date | null;
  setCheckOutDate: React.Dispatch<React.SetStateAction<Date | null>>;
  checkInDate: Date | null;
  setCheckInDate: React.Dispatch<React.SetStateAction<Date | null>>;
  getMinCheckoutDate: () => null | Date;
  adults: number;
  setAdults: React.Dispatch<React.SetStateAction<number>>;
  childrenNumber: number;
  setChildrenNumber: React.Dispatch<React.SetStateAction<number>>;
  isBooked?: boolean;
  slug: string;
};

const BookRoomCTA: FC<BookRoomCTAProps> = ({
  price,
  discount,
  specialNote,
  checkInDate,
  setCheckInDate,
  setCheckOutDate,
  checkOutDate,
  getMinCheckoutDate,
  adults,
  childrenNumber,
  setAdults,
  setChildrenNumber,
  isBooked,
  slug,
}) => {
  const discountedPrice = price - (price / 100) * discount;

  const handleBookNowClick = async () => {
    if (!checkInDate || !checkOutDate) {
      return toast.error("Please provide checkin / checkout date");
    }
    if (checkInDate > checkOutDate)
      return toast.error("Please choose a valid stay period");

    const numberOfDays = calculateNoOfDays() ?? 0;

    const hotelRoomSlug = slug;
    const stripe = await getStripe();
    try {
      const { data } = await axios.post("/api/stripe", {
        checkinDate: checkInDate,
        checkoutDate: checkOutDate,
        children: childrenNumber,
        hotelRoomSlug,
        adults,
        numberOfDays,
      });
      console.log(data);
      let stripeSession = data;
      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId: stripeSession.id,
        });

        if (result.error) {
          toast.error("Error with payment");
          throw result.error;
        }
      }
    } catch (error) {
      console.log("There was an error with payment", error);
    }
  };

  const calculateNoOfDays = () => {
    if (checkInDate && checkOutDate) {
      const diffDays = Math.ceil(
        (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      return diffDays;
    }
    return null;
  };

  return (
    <div className="px-7 py-6">
      <h3>
        <span
          className={`${discount ? "text-gray-400" : ""} font-bold text-xl`}
        >
          $ {price} &nbsp;
        </span>
        {discount ? (
          <span className="font-bold text-xl">
            | Discount {discount}% , Now{" "}
            <span className="text-tertiary-dark">${discountedPrice}</span>{" "}
          </span>
        ) : null}
      </h3>
      <div className="w-ful border-b-2 border-b-secondary my-2" />

      <h4 className="my-8">{specialNote}</h4>
      <div className="flex">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="check-in-datepicker"
            className="block text-sm text-gray-900 dark:text-gray-400"
          >
            Check In date
          </label>
          <DatePicker
            selected={checkInDate}
            onChange={(value: Date) => {
              setCheckInDate(value);
              if (checkOutDate && value.getTime() >= checkOutDate?.getTime()) {
                setCheckOutDate(null);
              }
            }}
            portalId="root-portal-2"
            dateFormat={"dd/MM/yyyy"}
            minDate={new Date()}
            id="check-in-datepicker"
            className="w-full border  text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary-600"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="check-out-datepicker"
            className="block text-sm text-gray-900 dark:text-gray-400"
          >
            Check Out date
          </label>
          <DatePicker
            selected={checkOutDate}
            onChange={(value: Date) => {
              setCheckOutDate(value);
            }}
            portalId="root-portal"
            dateFormat={"dd/MM/yyyy"}
            disabled={!checkInDate}
            minDate={getMinCheckoutDate()}
            id="check-out-datepicker"
            className="w-full border text-black border-gray-300 rounded-lg p-2.5 focus:ring-primary focus:border-primary-600"
          />
        </div>
      </div>

      <div className="flex mt-4 text-black">
        <div className="w-1/2 pr-2">
          <label
            htmlFor="adults"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Adults
          </label>
          <input
            type="number"
            id="adults"
            value={adults}
            onChange={(e) => {
              setAdults(parseInt(e.target.value));
            }}
            min={1}
            max={5}
            className="w-full border border-gray-300 rounded-lg p-2.5"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label
            htmlFor="children"
            className="block text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Children
          </label>
          <input
            type="number"
            id="children"
            min={0}
            max={3}
            value={childrenNumber}
            onChange={(e) => {
              setChildrenNumber(parseInt(e.target.value));
            }}
            className="w-full border border-gray-300 rounded-lg p-2.5 "
          />
        </div>
      </div>

      {calculateNoOfDays() ? (
        <p className="mt-3">
          Total Price: ${calculateNoOfDays()! * discountedPrice}
        </p>
      ) : null}

      <button
        onClick={handleBookNowClick}
        disabled={isBooked}
        className="btn-primary w-full mt-6 disabled:bg-gray-500 disabled:cursor-not-allowed"
      >
        {isBooked ? "Booked" : "Book Now"}
      </button>
    </div>
  );
};

export default BookRoomCTA;
