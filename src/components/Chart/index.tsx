"use client";

import { Booking } from "@/models/room";
import { FC } from "react";
import {
  Chart as ChartJs,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar } from "react-chartjs-2";

type Props = {
  bookingDetails: Booking[];
};

ChartJs.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: { position: "top" as const },
  },
  title: {
    display: true,
    text: "Bar Chart",
  },
};

const Chart: FC<Props> = ({ bookingDetails }) => {
  const labels = bookingDetails.map((booking) => booking.hotelRoom.name);
  const amountSpent = bookingDetails.map((booking) => booking.totalPrice);

  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Amount Spent",
            data: amountSpent,
            borderWidth: 1,
            backgroundColor: "#F27405",
            hoverBackgroundColor: "#F2C641",
          },
        ],
      }}
    />
  );
};

export default Chart;
