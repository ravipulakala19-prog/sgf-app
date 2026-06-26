import gallery1 from "@/assets/media/gallery-1.jpg.asset.json";
import galleryBlood from "@/assets/media/gallery-blood.jpg.asset.json";
import galleryEducation from "@/assets/media/gallery-education.jpg.asset.json";
import galleryRelief from "@/assets/media/gallery-relief.jpg.asset.json";
import pressNewstime from "@/assets/media/press-newstime.jpg.asset.json";
import slide1 from "@/assets/slider/slide-1.jpg.asset.json";
import slide2 from "@/assets/slider/slide-2.jpg.asset.json";
import slide3 from "@/assets/slider/slide-3.jpg.asset.json";
import slide4 from "@/assets/slider/slide-4.jpg.asset.json";
import slide5 from "@/assets/slider/slide-5.jpg.asset.json";
import press1 from "@/assets/media/press/press-1.jpg.asset.json";
import press2 from "@/assets/media/press/press-2.jpg.asset.json";
import press3 from "@/assets/media/press/press-3.jpg.asset.json";
import press4 from "@/assets/media/press/press-4.jpg.asset.json";
import press5 from "@/assets/media/press/press-5.jpg.asset.json";
import press6 from "@/assets/media/press/press-6.jpg.asset.json";
import press7 from "@/assets/media/press/press-7.jpg.asset.json";
import press8 from "@/assets/media/press/press-8.jpg.asset.json";
import press9 from "@/assets/media/press/press-9.jpg.asset.json";
import press10 from "@/assets/media/press/press-10.jpg.asset.json";
import press11 from "@/assets/media/press/press-11.jpg.asset.json";
import press12 from "@/assets/media/press/press-12.jpg.asset.json";

export const programSlugs = ["emergency", "blood", "education", "community", "relief"] as const;
export type ProgramSlug = (typeof programSlugs)[number];

export const programIndex: Record<ProgramSlug, number> = {
  emergency: 0,
  blood: 1,
  education: 2,
  community: 3,
  relief: 4,
};

/** Hero image + supporting gallery for each program. */
export const programMedia: Record<ProgramSlug, { hero: string; gallery: string[] }> = {
  emergency: {
    hero: gallery1.url,
    gallery: [press1.url, press2.url, pressNewstime.url, press3.url, press4.url],
  },
  blood: {
    hero: galleryBlood.url,
    gallery: [slide1.url, press5.url, press6.url],
  },
  education: {
    hero: galleryEducation.url,
    gallery: [slide3.url, press7.url, press8.url],
  },
  community: {
    hero: slide5.url,
    gallery: [slide4.url, press9.url, press10.url],
  },
  relief: {
    hero: galleryRelief.url,
    gallery: [galleryRelief.url, press11.url, press12.url, slide2.url],
  },
};
