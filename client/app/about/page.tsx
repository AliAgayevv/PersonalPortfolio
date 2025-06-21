import React from "react";
import { cookies } from "next/headers";
import CtaButton from "@/components/CtaButton";
import Image from "next/image";
import { FooterSocialIcons } from "@/components/Footer";
import socialMediaData from "@/data/socialMedia.json";

import ImageAnimation from "@/components/animations/ImageAnimation";
import TextAnimation from "@/components/animations/TextAnimation";
import { Metadata } from "next";
import getPageData from "@/lib/getPageData";

export const metadata: Metadata = {
  title: "Haqqımda",
  description:
    "Ali Aghayev-in developer kimi səyahəti. Next.js, React və TypeScript öyrənmə prosesi. Bakıda frontend developer olmaq və freelance təcrübə.",
  keywords: [
    "Ali Aghayev haqqında",
    "frontend developer səyahəti",
    "next.js öyrənmək",
    "react developer təcrübəsi",
    "bakı developer haqqında",
    "typescript öyrənmə prosesi",
    "freelance developer",
    "self-study developer azerbaijan",
  ],
  openGraph: {
    title: "Ali Aghayev Haqqında - Frontend Developer ",
    description:
      "Bakıda yaşayan Ali-nin frontend developer olmaq səyahəti və texniki bilikləri",
    images: ["/about-ali-developer.jpg"], // TODO: Replace with your actual image path
    url: "https://aghayev.dev/about",
  },
};

export default async function Page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const url =
    process.env.MODE === "development"
      ? "http://localhost:4000"
      : "http://45.85.146.73:5000";

  const aboutData = await getPageData("about", lang as "az" | "en");

  console.log("About Data:", aboutData);

  return (
    <div className="mt-24">
      <div className="flex flex-col md:flex-row justify-between w-full">
        <div className="flex flex-col w-full md:w-[50%]  justify-between">
          <TextAnimation
            animations={{
              initial: { opacity: 0, x: -200 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5 },
            }}
          >
            <h1 className="header-text font-bold py-4 md:py-0">
              {aboutData.content.title}
            </h1>
            <p className="w-full md:w-3/4 py-10">
              {aboutData.content.description}
            </p>
          </TextAnimation>
        </div>
        <div className="md:w-[35%] w-full my-10 h-full md:my-auto">
          <ImageAnimation
            animations={{
              initial: { opacity: 0, x: 200 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.5 },
            }}
          >
            <Image
              src={`${url}${aboutData.photos}`}
              width={1920}
              height={1920}
              alt="About Image"
              className="w-full h-full object-cover rounded-2xl shadow-2xl shadow-gray-500/90 hover:shadow-gray-500/30 transition-shadow duration-300 ease-in-out"
            />
          </ImageAnimation>
        </div>
      </div>

      <div className="flex mt-8 flex-col md:flex-row h-full pb-10">
        <TextAnimation
          animations={{
            initial: { opacity: 0, y: 200 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
          }}
        >
          <a
            href={`${url}/api/cv`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center md:justify-start w-full hover:cursor-pointer"
          >
            <CtaButton innerText={aboutData.content.buttonInner} mode="start" />
          </a>
        </TextAnimation>
        <div>
          <TextAnimation
            animations={{
              initial: { opacity: 0, y: 200 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5 },
            }}
          >
            <FooterSocialIcons
              linekdinURL={socialMediaData.linkedin}
              instagramURL={socialMediaData.instagram}
              mediumURL={socialMediaData.medium}
              githubURL={socialMediaData.github}
            />
          </TextAnimation>
        </div>
      </div>
    </div>
  );
}
