import { groq } from "next-sanity";

export const getFeaturedRoomQuery = groq`*[_type == "hotelRoom" && isFeatured == true][0]{
    _id,
    description,
    discount,
    images,
    isFeatured,
    name,
    price,
    slug,
    coverImage

}`;

export const getRoomsQuery = groq`*[_type == 'hotelRoom' ]{
    _id,
    coverImage,
    description,
    dimension,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type
}`;

export const getRoomQuery = groq`*[_type == 'hotelRoom' && slug.current == $roomSlug][0]{
    _id,
    coverImage,
    description,
    dimension,
    discount,
    isBooked,
    isFeatured,
    name,
    price,
    slug,
    type,
    offeredAmenities,
    numberOfBeds,
    specialNote,
    images
}`;

export const getUserBookingsQuery = groq`*[_type == 'booking' && user._ref == $userId]{
    _id,
    hotelRoom -> {
        _id, 
        name,
        slug,
        price
    },
    checkinDate,
    checkoutDate,
    numberofDays,
    adults,
    children,
    totalPrice,
    discount
}`;

export const getUserDataQuery = groq`*[_type == 'user' && _id == $userId][0]{
    _id,
    name,
    email,
    isAdmin,
    about,
    _createdAt,
    image
}`;

export const checkReviewExistsQuery = groq`*[_type == 'review' && user._ref == $userId && hotelRoom._ref == $hotelRoomId][0]{
    _id,
  
}`;

export const getRoomReviewsQuery = groq`*[_type == 'review' && hotelRoom._ref == $roomId]{
    _id,
    reviewText,
    userRating,
    user -> {
        name
    },
}`;
