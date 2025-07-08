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
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  try {
    const { id: projectId } = await params;
    const url = "https://aghayev.dev";

    const projectResponse = await fetch(`${url}/api/projects/${projectId}`, {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!projectResponse.ok) {
      throw new Error("Project tapılmadı");
    }

    const projectData: projectInterface = await projectResponse.json();

    if (!projectData || !projectData._id) {
      throw new Error("Project məlumatları yoxdur");
    }

    const techStackNames = projectData.techStack
      .map((tech: projectTechInterface) => tech.name)
      .join(", ");

    const timelineText = projectData.timeLine
      ? ` Layihə müddəti: ${projectData.timeLine}.`
      : "";

    return {
      title: projectData.title,
      description: `${projectData.description}${timelineText} Texnologiyalar: ${techStackNames}. Ali Ağayev tərəfindən hazırlanmış professional veb layihəsi.`,
      keywords: [
        projectData.title.toLowerCase(),
        `project id ${projectData.projectId}`,
        "ali ağayevin lahiyələri",
        "veb development project",
        "frontend project baku",
        "portfolio layihəsi",
        ...projectData.techStack.map(
          (tech: projectTechInterface) => `${tech.name.toLowerCase()} layihəsi`
        ),
        "azerbaijan developer project",
        "freelance veb layihəsi",
        `${projectData.timeLine} project`,
      ],
      openGraph: {
        title: `${projectData.title} - Ali Ağayev Portfolio`,
        description: `${projectData.description} İstifadə olunan texnologiyalar: ${techStackNames}`,
        url: `https://aghayev.dev/projects/${projectData.projectId}`,
        siteName: "Ali Ağayev Portfolio",
        locale: "az_AZ",
        type: "website",
        images: [
          {
            url: `https://aghayev.dev/api/og?title=${encodeURIComponent(
              projectData.title
            )}`,
            alt: `${projectData.title} - Ali Ağayev Portfolio Layihəsi`,
            width: 1200,
            height: 630,
            type: "image/png",
          },
          {
            url: `https://aghayev.dev${projectData.image}`,
            alt: `${projectData.title} ekran görüntüsü`,
            width: 1200,
            height: 675,
            type: "image/jpeg",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: `${projectData.title} - Ali Ağayev Portfolio`,
        description: `${projectData.description}`,
        images: [
          `https://aghayev.dev/api/og?title=${encodeURIComponent(
            projectData.title
          )}`,
        ],
        creator: "@aliaghayev",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: `https://aghayev.dev/projects/${projectData.projectId}`,
        languages: {
          "az-AZ": `https://aghayev.dev/projects/${projectData.projectId}`,
          "en-US": `https://aghayev.dev/en/projects/${projectData.projectId}`,
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: projectData.title,
          description: projectData.description,
          author: {
            "@type": "Person",
            name: "Ali Ağayev",
            url: "https://aghayev.dev",
          },
          url: `https://aghayev.dev/projects/${projectData.projectId}`,
          applicationCategory: "WebApplication",
          operatingSystem: "Web Browser",
          screenshot: `https://aghayev.dev${projectData.image}`,
          dateCreated: projectData.createdAt,
          dateModified: projectData.updatedAt,
          programmingLanguage: projectData.techStack.map(
            (tech: projectTechInterface) => tech.name
          ),
          sameAs: [projectData.liveLink, projectData.githubLink],
          identifier: projectData._id,
          version: projectData.projectId,
        }),
      },
    };
  } catch (error) {
    console.error("Project metadata yaratma xətası:", error);

    return {
      title: "Layihə Tapılmadı",
      description:
        "Axtardığınız layihə tapılmadı. Ali Ağayev-in digər layihələrinə baxın.",
      openGraph: {
        title: "Layihə Tapılmadı - Ali Ağayev Portfolio",
        description: "Axtardığınız layihə tapılmadı.",
        images: [
          {
            url: "https://aghayev.dev/api/og?title=Layihə%20Tapılmadı",
            alt: "Layihə Tapılmadı",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
}

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
            {String(projectData.description)}
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
            {String(projectData.description)}
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
      <div className="absolute w-full left-0 h-1/2 mt-16 md:mt-16">
        <Footer />
      </div>
    </div>
  );
}
