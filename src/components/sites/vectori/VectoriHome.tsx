import { Hero } from "./Hero";
import { Community, Features, MeetTheBrand, MemoryCard, Reviews } from "./InteractiveSections";
import { ProductSlider } from "./ProductSlider";
import { Ambassador, EarlyAccess, Help, TreesPlanted } from "./StaticSections";

export function VectoriHome() {
  return (
    <>
      <Hero />
      <ProductSlider />
      <EarlyAccess />
      <Features />
      <TreesPlanted />
      <MeetTheBrand />
      <Reviews />
      <MemoryCard />
      <Community />
      <Ambassador />
      <Help />
    </>
  );
}
