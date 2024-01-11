import { defineField } from "sanity";

const roomTypes = [
  {
    title: "Basic",
    value: "basic",
  },
  {
    title: "Luxuary",
    value: "luxuary",
  },
  {
    title: "Deluxe",
    value: "deluxe",
  },
];

const hotelRoom = {
  name: "hotelRoom",
  title: "Hotel Room",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) =>
        Rule.required().max(50).error("Maxium 50 Characters Allowed"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      title: "Description",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      type: "number",
      title: "Price",
      validation: (Rule) => Rule.required().greaterThan(0),
    }),
    defineField({
      name: "discount",
      type: "number",
      title: "Discount",
      initialValue: 0,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "images",
      type: "array",
      title: "Images",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", type: "url", title: "URL" },
            { name: "file", type: "file", title: "File" },
          ],
        },
      ],
      validation: (Rule) =>
        Rule.required().min(3).error("Minimum 3 images required"),
    }),
    defineField({
      name: "coverImage",
      type: "object",
      title: "Cover Image",
      fields: [
        { name: "url", type: "url", title: "URL" },
        { name: "file", type: "file", title: "File" },
      ],
      validation: (Rule) => Rule.required().error("Cover image required"),
    }),
    defineField({
      name: "type",
      type: "string",
      title: "Room Type",
      options: {
        list: roomTypes,
      },
      validation: (Rule) => Rule.required(),
      initialValue: "basic",
    }),
    defineField({
      name: "specialNote",
      type: "text",
      title: "Special Note",
      validation: (Rule) => Rule.required(),
      initialValue:
        "Check-in time is at 12:00 PM , Checkout time is 11:59 AM, if you leave behind anything, Please contact the receptionist.",
    }),
    defineField({
      name: "dimensions",
      type: "string",
      title: "Dimensions",
    }),
    defineField({
      name: "numberofBedRooms",
      type: "number",
      title: "Number of Bedrooms",
      validation: (Rule) => Rule.required().min(1),
      initialValue: 1,
    }),

    defineField({
      name: "offeredAmenities",
      type: "array",
      title: "Offered Amenitites",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
            },
            {
              name: "amenity",
              title: "Amenity",
              type: "string",
            },
          ],
        },
      ],
    }),

    defineField({
      name: "isBooked",
      type: "boolean",
      title: "Is Booked?",
      validation: (Rule) => Rule.required(),
      initialValue: false,
    }),
    defineField({
      name: "reviews",
      type: "array",
      title: "Reviews",
      of: [{ type: "review" }],
    }),
  ],
};
export default hotelRoom;
