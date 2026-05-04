import StudioGate from "./studio";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return (
    <>
      {/* Studio fullscreen — global chrome hides via separate layout */}
      <StudioGate />
    </>
  );
}
