import { groq } from "next-sanity";

export const siteSettingsQuery = groq`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    ...,
    newMuslimsSlides[]->{
      _id,
      title,
      subtitle,
      image,
      body,
      linkLabel,
      linkHref,
      orderRank
    }
  }
`;

export const pageBySlugQuery = groq`*[_type == "pageContent" && slug.current == $slug][0]`;

export const legalBySlugQuery = groq`*[_type == "legalPage" && slug.current == $slug][0]`;

export const prayerOverridesForRangeQuery = groq`*[
    _type == "prayerDayOverride" &&
    date >= $from &&
    date <= $to
  ] | order(date asc)`;
