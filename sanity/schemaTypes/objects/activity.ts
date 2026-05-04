import { defineField, defineType } from "sanity";

export const activityItemType = defineType({
  name: "activityItem",
  title: "Activity",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "body", title: "Description", type: "text", rows: 4, validation: (r) => r.required() }),
    defineField({ name: "bodyAr", title: "Description (Arabic)", type: "text", rows: 4 }),
    defineField({
      name: "iconKey",
      title: "Icon key",
      type: "string",
      initialValue: "mosque",
      description: "book | mosque | compass",
    }),
  ],
});
