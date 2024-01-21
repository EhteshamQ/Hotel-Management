export type Booking = {
  _id: string;
  hotelRoom: {
    _id: string;
    name: string;
    slug: { current: string };
    price: string;
  };
  checkinDate: Date;
  checkoutDate: Date;
  numberofDays: number;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
};

export type CreateBookingDTO = {
  user: string;
  hotelRoom: string;
  checkInDate: string;
  checkOutDate: string;
  adults: number;
  children: number;
  totalPrice: number;
  discount: number;
  numberofDays: number;
};
