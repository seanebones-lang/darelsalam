import { defineField, defineType } from "sanity";

export const donationTierType = defineType({
  name: "donationTier",
  title: "Donation tier",
  type: "object",
  fields: [
    defineField({ name: "amountLabel", title: "Display amount", type: "string", initialValue: "$50", validation: (r) => r.required() }),
    defineField({
      name: "externalUrl",
      title: "External checkout URL",
      type: "url",
      validation: (r) => r.required(),
    }),
  ],
});
