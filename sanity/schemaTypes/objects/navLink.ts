import { defineField, defineType } from "sanity";

export const navLinkType = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "labelAr",
      title: "Label (Arabic, optional)",
      type: "string",
      description: "Shown when site language is Arabic; falls back to Label then built-in map.",
    }),
    defineField({ name: "href", title: "Path or URL", type: "string", description: "/donate or https://...", validation: (r) => r.required() }),
    defineField({ name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false }),
  ],
});
