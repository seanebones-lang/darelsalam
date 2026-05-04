import { defineField, defineType } from "sanity";

export const navLinkType = defineType({
  name: "navLink",
  title: "Navigation link",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "href", title: "Path or URL", type: "string", description: "/donate or https://...", validation: (r) => r.required() }),
    defineField({ name: "openInNewTab", title: "Open in new tab", type: "boolean", initialValue: false }),
  ],
});
