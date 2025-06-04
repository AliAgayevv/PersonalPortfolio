import { cookies } from "next/headers";
import TypewriterEffect from "@/components/TypewriterEffect";
import CtaButton from "@/components/CtaButton";
import TechStackSection from "@/sections/TechStackSection";
import ProjectSection from "@/sections/ProjectSection";
import SeeMoreButton from "@/components/SeeMoreButton";
import ServicesCard from "@/components/ServicesCard";
import EndSection from "@/sections/EndSection";
import Footer from "@/components/Footer";
import Image from "next/image";
import AnimationWhenElementOnScreen from "@/components/animations/AnimationWhenElementOnScreen";
import TextAnimation from "@/components/animations/TextAnimation";

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const res = await fetch("http://localhost:4000/api/pages/hero", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  const servicesRes = await fetch("http://localhost:4000/api/services", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });
  const servicesData = await servicesRes.json();
  if (!servicesRes.ok) {
    throw new Error("Failed to fetch services data");
  }

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  console.log("servicesData:", servicesData);

  const data = await res.json();

  console.log("Hero Data:", data);

  console.log(`http://localhost:4000${data.photos}`);

  return (
    <div>
      <main className={`flex flex-col  h-screen w-full  justify-center `}>
        <div className="size-32 rounded-full  border-black border-5 shadow-lg -mt-10 md:-mt-40 mb-10">
          {/* ! Change to Image component with image kit */}
          {/* <img
            className="w-full h-full rounded-full"
            src={data.content.photos && data.content.photos}
          /> */}
          <Image
            src={`http://localhost:4000${data.photos}`}
            width={80}
            className="w-full h-full rounded-full object-cover"
            height={80}
            alt="Profile Picture"
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
      </main>

      <TechStackSection />

      <div className=" absolute left-0  w-full bg-black mt-40 pt-20">
        <ProjectSection />
        <section className="text-white w-[90%] mx-auto mt-40 h-full">
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
            {servicesData.map((service: any) => (
              <ServicesCard
                key={service._id}
                title={service.title}
                description={service.description}
                list={service.techStack}
              />
            ))}
          </div>
        </section>

        <EndSection />
        <Footer />
      </div>
    </div>
  );
}
