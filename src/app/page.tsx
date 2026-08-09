import { Nav } from "@/components/nav";
import { ScrollVideoHero } from "@/components/scroll-video-hero";
import { SteamSection } from "@/components/steam-section";
import { SignaturePlates } from "@/components/signature-plates";
import { CareersSection } from "@/components/careers-section";
import {
  StorySection,
  RatingsSection,
  EventsSection,
  VisitSection,
  Footer,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <ScrollVideoHero />
        <SteamSection />
        <SignaturePlates />
        <StorySection />
        <RatingsSection />
        <EventsSection />
        <CareersSection />
        <VisitSection />
      </main>
      <Footer />
    </>
  );
}
