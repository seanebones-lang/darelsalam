import { defineField, defineType } from "sanity";

export const pageContent = defineType({
  name: "pageContent",
  title: "Page",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "intro", title: "Intro", type: "text", rows: 3 }),
    defineField({ name: "introAr", title: "Intro (Arabic)", type: "text", rows: 3 }),
    defineField({
      name: "body",
      title: "Body",
      type: "blockContent",
    }),
    defineField({
      name: "bodyAr",
      title: "Body (Arabic)",
      type: "blockContent",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO description",
      type: "text",
      rows: 2,
    }),
    defineField({ name: "seoDescriptionAr", title: "SEO description (Arabic)", type: "text", rows: 2 }),
  ],
});
