// app/about/page.tsx (server component)
import React from "react";
import { cookies } from "next/headers";
import CtaButton from "@/components/CtaButton";
import Image from "next/image";
import { FooterSocialIcons } from "@/components/Footer";

import ImageAnimation from "@/components/animations/ImageAnimation";
import TextAnimation from "@/components/animations/TextAnimation";

export default async function Page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  // Fetch your “about” text/data
  const res = await fetch("http://localhost:4000/api/pages/about", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });
  if (!res.ok) console.error("Failed to fetch /api/pages/about");

  const aboutData = await res.json();

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
              src={`http://localhost:4000${aboutData.photos}`}
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
            href="http://localhost:4000/api/cv"
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
              linekdinURL={aboutData.content.linkLi}
              instagramURL={aboutData.content.linkIg}
            />
          </TextAnimation>
        </div>
      </div>
    </div>
  );
}
