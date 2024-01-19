type CoverImage = {
  url: string;
};

export type Image = {
  _key: string;
  url: string;
};

type Amenity = {
  _key: string;
  amenity: string;
  icon: string;
};

type Slug = {
  _type: string;
  current: string;
};

export type Room = {
  _id: string;
  coverImage: CoverImage;
  description: string;
  dimension: string;
  discount: number;
  images: Image[];
  isFeatured: boolean;
  name: string;
  numberOfBeds: number;
  offeredAmenities: Amenity[];
  slug: Slug;
  price: number;
  specialNote: string;
  type: string;
  isBooked: boolean;
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

export type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  about: string;
  _createdAt: String;
  image: string;
};
