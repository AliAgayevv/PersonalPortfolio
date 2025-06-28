import CtaButton from "@/components/CtaButton";
import { cookies } from "next/headers";
import Link from "next/link";
import StackCard from "@/components/StackCard";
import Image from "next/image";
import Footer from "@/components/Footer";
import projectInterface, {
  projectTechInterface,
} from "@/types/projectInterface";
import getUrl from "@/lib/getUrl";
import getPageData from "@/lib/getPageData";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = await params;

  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const url = getUrl();

  const projectResponse = await fetch(`${url}/api/projects/${projectId}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  const pageData = await getPageData("projectsInner", lang as "az" | "en");

  if (!projectResponse.ok) {
    throw new Error("Failed to fetch project data");
  }

  const projectData: projectInterface = await projectResponse.json();

  if (!projectData) {
    throw new Error("No project data found");
  }

  return (
    <div className="mt-14 md:mt-24 mx-auto h-full">
      {/* Header Section */}
      <div className="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-center">
        {/* Title Section */}
        <div className="flex items-center gap-3 md:gap-4">
          <Link href="/projects">
            <CtaButton innerText="" mode="goBack" />
          </Link>
          <h1 className="font-[600] text-2xl md:text-4xl lg:text-5xl xl:text-66px leading-tight">
            {projectData.title}
          </h1>
        </div>

        {/* Buttons Section */}
        <div className="flex gap-3 md:gap-4 items-center my-4 md:my-0">
          <Link
            href={projectData.liveLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <CtaButton innerText={pageData.content.liveWebsite} mode="start" />
          </Link>
          <Link
            href={projectData.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="rounded-2xl h-11 md:h-full text-black bg-white flex justify-center items-center gap-1 border px-4 py-3 md:p-4 border-gray-300 shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all duration-300 text-sm md:text-base">
              Github
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden">
        <div className="mt-8">
          <p className="text-sm text-[#4B4949] font-[500] leading-relaxed break-words">
            {projectData.description}
          </p>
        </div>

        {/* Image */}
        <div className="mt-8">
          <div className="relative w-full aspect-video">
            <Image
              src={`${url}${projectData.image}`}
              alt={projectData.title}
              fill
              className="object-cover rounded-2xl shadow-lg shadow-black/20"
              priority
              sizes="100vw"
            />
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-8">
          <h3 className="text-lg text-[#0F0F0F] font-[600] mb-4">
            {pageData.content.techStack}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {projectData.techStack.map((tech: projectTechInterface) => (
              <StackCard
                key={tech._id}
                stackTitle={tech.name}
                stackDescription={""}
                stackIcon={tech.icon}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-start mt-20">
        {/* Left Column - Description and Tech Stack */}
        <div className="space-y-8">
          {/* Description */}
          <p className="text-base text-[#4B4949] font-[500] leading-relaxed break-words">
            {projectData.description}
          </p>

          {/* Tech Stack */}
          <div>
            <h3 className="text-2xl text-[#0F0F0F] font-[600] mb-6">
              {pageData.content.techStack}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {projectData.techStack.map((tech: projectTechInterface) => (
                <StackCard
                  key={tech._id}
                  stackTitle={tech.name}
                  stackDescription={""}
                  stackIcon={tech.icon}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="w-full">
          <div className="relative w-full aspect-video">
            <Image
              src={`${url}${projectData.image}`}
              alt={projectData.title}
              fill
              className="object-cover rounded-2xl shadow-lg shadow-black/20"
              priority
              sizes="50vw"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className=" absolute w-full left-0 h-1/2 mt-16 md:mt-16">
        <Footer />
      </div>
    </div>
  );
}
