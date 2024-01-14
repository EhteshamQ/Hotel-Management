import { defineField } from "sanity";

const user = {
  name: "user",
  title: "User",
  type: "document",
  fields: [
    defineField({
      name: "isAdmin",
      title: "Is Admin",
      type: "boolean",
      description: "Check if the user is admin",
      initialValue: false,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      description: "Name of the user",
      readOnly: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "url",
    }),
    defineField({
      name: "password",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "email",
      type: "string",
      title: "Email",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "emailVerified",
      type: "boolean",
      hidden: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about",
      type: "text",
      title: "About",
      description: "Brief Description",
    }),
  ],
};
export default user;
