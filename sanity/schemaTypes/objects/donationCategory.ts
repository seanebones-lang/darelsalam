import { defineField, defineType } from "sanity";

export const donationCategoryType = defineType({
  name: "donationCategory",
  title: "Donation category",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "subtitle",
      title: "Subtitle (optional)",
      type: "string",
      description: "e.g. $50 or explained amount",
    }),
    defineField({
      name: "externalUrl",
      title: "External checkout URL",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
});
