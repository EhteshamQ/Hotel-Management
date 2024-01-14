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