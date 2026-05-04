import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";
import { projectId, dataset } from "@/sanity/env";

const builder = createImageUrlBuilder({ projectId, dataset });

export function sanityImageUrl(source: SanityImageSource) {
  return builder.image(source);
}
