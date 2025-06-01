import CtaButton from "@/components/CtaButton";
import { cookies } from "next/headers";
import Link from "next/link";
import StackCard from "@/components/StackCard";
import Image from "next/image";

export default async function page({ params }: { params: { id: string } }) {
  const projectId = params.id;

  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const projectResponse = await fetch(
    `http://localhost:4000/api/projects/${projectId}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    }
  );

  const pageResponse = await fetch(
    "http://localhost:4000/api/pages/projectsInner",
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": lang,
      },
    }
  );

  if (!pageResponse.ok) {
    throw new Error("Failed to fetch page data");
  }

  if (!projectResponse.ok) {
    throw new Error("Failed to fetch project data");
  }

  const projectData = await projectResponse.json();
  const pageData = await pageResponse.json();

  if (!projectData) {
    throw new Error("No project data found");
  }

  console.log(projectData);

  return (
    <div className="mt-24 mx-auto px-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/projects">
            <CtaButton innerText="" mode="goBack" />
          </Link>
          <h1 className="font-[600] text-66px">{projectData.title}</h1>
        </div>
        <div className="flex gap-4 items-center">
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
            <button className="rounded-2xl text-black bg-white flex justify-center items-center gap-1 border p-4 border-gray-300 shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all duration-300">
              Github
            </button>
          </Link>
        </div>
      </div>

      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <p className="text-16px text-[#4B4949] font-[500] leading-relaxed break-words">
            {projectData.description}
          </p>

          <div>
            <h3 className="text-24px text-[#0F0F0F] font-[600] mb-6">
              {pageData.content.techStack}
            </h3>
            <div className="grid grid-cols-2 gap-4 ">
              {projectData.techStack.map((tech: any) => (
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
          <Image
            src={`http://localhost:4000${projectData.image}`}
            alt={projectData.title}
            width={800}
            height={450}
            className="w-full h-auto object-cover rounded-2xl shadow-lg shadow-black/20"
            priority
          />
          {/* <img
            src={projectData.image || "/placeholder.svg"}
            alt={projectData.title}
            className="w-full h-auto object-cover rounded-2xl shadow-lg shadow-black/20"
          /> */}
        </div>
      </div>
    </div>
  );
}
