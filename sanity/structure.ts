import type { StructureResolver } from "sanity/structure";

export const resolveStructure: StructureResolver = (S) =>
  S.list()
    .title("Dar El Salam")
    .items([
      S.listItem()
        .title("Site settings")
        .schemaType("siteSettings")
        .id("singleton-siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId?.();
        return id !== "siteSettings";
      }),
    ]);
