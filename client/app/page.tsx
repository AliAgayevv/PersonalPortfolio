import { cookies } from "next/headers";
import TypewriterEffect from "@/components/TypewriterEffect";
import CtaButton from "@/components/CtaButton";
import StackCard from "@/components/StackCard";
import ProjectCard from "@/components/ProjectCard";
import SeeMoreButton from "@/components/SeeMoreButton";

export default async function Home() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az"; // default az

  const res = await fetch("http://localhost:4000/api/pages/hero", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  const data = await res.json();

  console.log(data);

  return (
    <div>
      <main className={`flex flex-col  h-screen w-full  justify-center `}>
        <div className="w-20 h-20 rounded-full  border-black border-5 shadow-lg -mt-40 mb-10">
          {/* ! Change to Image component with image kit */}
          <img
            className="w-full h-full rounded-full"
            src={
              "data:image/jpeg;base64,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"
            }
          ></img>
        </div>
        <h1 className={`header-text font-bold `}>
          <TypewriterEffect
            stringsFromBackend={data.content?.heroText?.[lang].split("_")}
          />
        </h1>
        <p className="text-[#00000080] w-1/4 text-16px">
          {data.content?.pageDescription?.[lang]}
        </p>
        <div className="flex gap-4 mt-10 ">
          <CtaButton innerText={data.content?.ctaButton?.[lang]} />
          <button className="px-[clamp(16px,3vw,24px)] py-[clamp(10px,2.5vw,14px)] text-16px border border-neutral-300 text-black bg-white rounded-3xl ">
            {data.content?.contact?.[lang]}
          </button>
        </div>
        <div className="w-[90%] pt-20 ">
          <div className=" grid grid-cols-3 gap-4 text-[#00000080]  text-14px">
            <p className="">{data.content?.experience?.[lang]}</p>
            <p className="">{data.content?.location?.[lang]}</p>
            <p className="">{data.content?.freelance?.[lang]}</p>
          </div>
          <div className="grid grid-cols-3 gap-4  font-[600] text-24px">
            <p className="">{data.content?.experienceLength?.[lang]}</p>
            <p className="">{data.content?.locationData?.[lang]}</p>
            <p className="">{data.content?.freelance?.[lang]}</p>
          </div>
        </div>
      </main>
      <section className="w-full h-full   ">
        <h2 className="text-black header-text font-[600]"> My stacks</h2>
        <div className="grid grid-cols-2 gap-4 mt-10 ">
          {/* Real data get from backend will added */}
          <StackCard
            stackTitle="React"
            stackDescription="JavaScript library for building user interfaces"
            stackIcon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          />
          <StackCard
            stackTitle="React"
            stackDescription="JavaScript library for building user interfaces"
            stackIcon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          />
          <StackCard
            stackTitle="React"
            stackDescription="JavaScript library for building user interfaces"
            stackIcon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          />
          <StackCard
            stackTitle="React"
            stackDescription="JavaScript library for building user interfaces"
            stackIcon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          />
          <StackCard
            stackTitle="React"
            stackDescription="JavaScript library for building user interfaces"
            stackIcon="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"
          />
        </div>
      </section>

      <div className=" absolute left-0  w-screen bg-black mt-40 pt-20">
        <section className="text-white w-[90%] mx-auto">
          <div className="flex justify-between items-center mb-10">
            <h2 className="header-text font-[600] uppercase">Projects</h2>
            <div>
              <SeeMoreButton innerText="See more" />
            </div>
          </div>
          <div className="grid-cols-2 grid gap-4">
            <ProjectCard
              projectName="Project 1"
              projectDescription="This is a description of project 1"
              projectImage="data:image/jpeg;base64,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"
              projectLink="#"
              projectShowenLink="View Project"
              projectId="1"
            />
            <ProjectCard
              projectName="Project 1"
              projectDescription="This is a description of project 1"
              projectImage="data:image/jpeg;base64,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"
              projectLink="#"
              projectShowenLink="View Project"
              projectId="1"
            />
          </div>
        </section>
        <section className="text-white w-[90%] mx-auto mt-40 h-full">
          <div className="flex justify-between items-center mb-10">
            <h2 className="header-text font-[600] uppercase">Services</h2>
            <div>
              <SeeMoreButton innerText="Discover" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
