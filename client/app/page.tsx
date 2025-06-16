import Image from "next/image";
import { cookies } from "next/headers";
import Footer from "@/components/Footer";
import CtaButton from "@/components/CtaButton";
import EndSection from "@/sections/EndSection";
import ServicesCard from "@/components/ServicesCard";
import SeeMoreButton from "@/components/SeeMoreButton";
import TextAnimation from "@/components/animations/TextAnimation";
import ProjectSection from "@/sections/ProjectSection";
import TechStackSection from "@/sections/TechStackSection";
import TypewriterEffect from "@/components/TypewriterEffect";
import AnimationWhenElementOnScreen from "@/components/animations/AnimationWhenElementOnScreen";
import ServiceInterface from "@/types/ServiceInterface";
import getPageData from "@/lib/getPageData";
import getUrl from "@/lib/getUrl";
import socialMediaAdress from "@/data/socialMedia.json";

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const data = await getPageData("hero", lang as "az" | "en");
  const url = getUrl();

  const servicesRes = await fetch(`${url}/api/services`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });
  if (!servicesRes.ok) {
    throw new Error("Failed to fetch services data");
  }
  const servicesData = await servicesRes.json();

  const backendUrl = getUrl();

  const seoData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Ali",
    jobTitle: "Front-end Developer",
    description: data.content?.pageDescription,
    image: `${backendUrl}${data.photos}`,
    sameAs: [
      socialMediaAdress.linkedin,
      socialMediaAdress.github,
      socialMediaAdress.instagram,
    ],
    address: {
      addressLocality: "Baku",
      addressCountry: "AZ",
    },

    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Web Development",
      "JavaScript",
      "NGINX",
    ],
    hasOccupation: {
      "@type": "Person",
      name: "Web Developer",
      occupationLocation: {
        "@type": "City",
        name: "Baku",
      },
    },
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(seoData),
        }}
      />
      <header className={`flex flex-col  h-screen w-full  justify-center `}>
        <div className="size-32 rounded-full  border-black border-5 shadow-lg -mt-10 md:-mt-40 mb-10">
          <Image
            src={`${backendUrl}${data.photos}`}
            width={80}
            className="w-full h-full rounded-full object-cover"
            height={80}
            priority
            quality={100}
            alt={`${lang === "az" ? "Profil şəkli" : "Profile picture"}
            `}
          />
        </div>
        <h1 className={`header-text font-bold `}>
          <TypewriterEffect
            stringsFromBackend={data.content?.heroText.split("_")}
          />
        </h1>
        <p className="text-[#00000080] w-3/4 md:w-1/4 text-16px">
          {data.content?.pageDescription}
        </p>
        <div className="flex gap-4 mt-10 ">
          <CtaButton innerText={data.content?.ctaButton} mode="start" />
          <a href="/about">
            <button className="px-[clamp(16px,3vw,24px)] py-[clamp(10px,2.5vw,14px)] text-16px border border-neutral-300 text-black bg-white rounded-3xl ">
              {data.content?.contact}
            </button>
          </a>
        </div>
        <div className="w-[90%] pt-20">
          <TextAnimation
            animations={{
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.2 },
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-[#00000080] text-sm">
                  {data.content?.experience}
                </p>
                <p className="text-black font-semibold text-xl">
                  {data.content?.experienceLength}
                </p>
              </div>

              <div>
                <p className="text-[#00000080] text-sm">
                  {data.content?.location}
                </p>
                <p className="text-black font-semibold text-xl">
                  {data.content?.locationData}
                </p>
              </div>

              <div>
                <p className="text-[#00000080] text-sm">
                  {data.content?.freelance}
                </p>
                <p className="text-black font-semibold text-xl">
                  {data.content?.freelanceStatus}
                </p>
              </div>
            </div>
          </TextAnimation>
        </div>
      </header>

      <TechStackSection />

      <div className=" absolute left-0  w-full bg-black mt-40 pt-20">
        <ProjectSection />
        <section
          aria-labelledby="services-heading"
          className="text-white w-[90%] mx-auto mt-40 h-full"
        >
          <div className="flex justify-between items-center mb-10">
            <h2 className="header-text font-[600] uppercase">
              {lang === "az" ? "Xidmətlər" : "Services"}
            </h2>
            <div>
              <SeeMoreButton
                innerText={lang === "az" ? "Daha çox" : "See more"}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2  h-full mb-40 flex flex-col gap-10 md:ml-auto">
            {servicesData.map((service: ServiceInterface) => (
              <ServicesCard
                key={service._id}
                title={service.title}
                description={service.description}
                list={service.techStack}
              />
            ))}
          </div>
        </section>

        <AnimationWhenElementOnScreen
          animations={{
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.2 },
          }}
        >
          <EndSection />
        </AnimationWhenElementOnScreen>
        <Footer />
      </div>
    </div>
  );
}
