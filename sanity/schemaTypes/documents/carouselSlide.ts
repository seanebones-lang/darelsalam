import { defineField, defineType } from "sanity";

export const carouselSlide = defineType({
  name: "carouselSlide",
  title: "New Muslims Carousel Slide",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "titleAr", title: "Title (Arabic)", type: "string" }),
    defineField({ name: "subtitle", title: "Subtitle", type: "string" }),
    defineField({ name: "subtitleAr", title: "Subtitle (Arabic)", type: "string" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
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
    defineField({ name: "linkLabel", title: "Button label", type: "string" }),
    defineField({ name: "linkLabelAr", title: "Button label (Arabic)", type: "string" }),
    defineField({
      name: "linkHref",
      title: "Link URL",
      type: "url",
    }),
    defineField({
      name: "orderRank",
      title: "Sort order",
      type: "number",
      description: "Lower numbers appear first.",
    }),
  ],
  preview: {
    select: { title: "title", media: "image", subtitle: "subtitle" },
  },
});
