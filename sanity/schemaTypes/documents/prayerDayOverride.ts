import { defineField, defineType } from "sanity";

export const prayerDayOverride = defineType({
  name: "prayerDayOverride",
  title: "Prayer day override",
  type: "document",
  fields: [
    defineField({
      name: "date",
      title: "Date (Gregorian)",
      type: "date",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "useCalculatedAthans",
      title: "Keep calculated Athan times from API",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "overrideFajr",
      title: "Fajr (override time HH:MM, local mosque)",
      type: "string",
    }),
    defineField({ name: "overrideDhuhr", title: "Dhuhr (HH:MM)", type: "string" }),
    defineField({ name: "overrideAsr", title: "Asr (HH:MM)", type: "string" }),
    defineField({ name: "overrideMaghrib", title: "Maghrib (HH:MM)", type: "string" }),
    defineField({ name: "overrideIsha", title: "Isha (HH:MM)", type: "string" }),
  ],
});
