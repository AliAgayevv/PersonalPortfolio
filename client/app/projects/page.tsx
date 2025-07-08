import CtaButton from "@/components/CtaButton";
import Footer from "@/components/Footer";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import getPageData from "@/lib/getPageData";
import AllProjects from "@/components/AllProjects";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import Link from "next/link";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const commonTechStacks = [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "Node.js",
      "MongoDB",
      "Prisma",
    ];

    const projectCountText = "Professional veb layihələri.";

    return {
      title: "Layihələr",
      description: `Ali Ağayev-in portfolio layihələri. Next.js, React, TypeScript və digər müasir texnologiyalar ilə hazırlanmış ${projectCountText} Bakıda freelance frontend developer tərəfindən yaradılmış.`,
      keywords: [
        "ali ağayev layihələri",
        "portfolio projects",
        "frontend developer layihələri",
        "next.js portfolio",
        "react layihələri",
        "typescript projects",
        "baku developer portfolio",
        "freelance web projects",
        "azerbaijan developer works",
        "web development portfolio",
        ...commonTechStacks.map((tech) => `${tech.toLowerCase()} portfolio`),
        "professional web projects",
        "modern frontend projects",
      ],
      openGraph: {
        title: "Layihələr - Ali Ağayev Portfolio",
        description: `Ali Ağayev-in professional frontend layihələri. Müasir texnologiyalar ilə hazırlanmış portfolio.`,
        url: "https://aghayev.dev/projects",
        siteName: "Ali Ağayev Portfolio",
        locale: "az_AZ",
        type: "website",
        images: [
          {
            url: `https://aghayev.dev/api/og?title=${encodeURIComponent(
              "Layihələr"
            )}`,
            alt: "Ali Ağayev Portfolio Layihələri",
            width: 1200,
            height: 630,
            type: "image/png",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Layihələr - Ali Ağayev Portfolio",
        description: `Professional frontend layihələri portfolio.`,
        images: [
          `https://aghayev.dev/api/og?title=${encodeURIComponent("Layihələr")}`,
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
        canonical: "https://aghayev.dev/projects",
        languages: {
          "az-AZ": "https://aghayev.dev/projects",
          "en-US": "https://aghayev.dev/en/projects",
        },
      },
      other: {
        "application/ld+json": JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Ali Ağayev Portfolio Layihələri",
          description:
            "Professional frontend developer tərəfindən hazırlanmış veb layihələri kolleksiyası",
          url: "https://aghayev.dev/projects",
          author: {
            "@type": "Person",
            name: "Ali Ağayev",
            url: "https://aghayev.dev",
            jobTitle: "Frontend Developer",
            workLocation: {
              "@type": "Place",
              name: "Bakı, Azərbaycan",
            },
          },
          mainEntity: {
            "@type": "ItemList",
            name: "Portfolio Layihələri",
            description: "Professional frontend development layihələri",
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Ana Səhifə",
                item: "https://aghayev.dev",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Layihələr",
                item: "https://aghayev.dev/projects",
              },
            ],
          },
        }),
      },
    };
  } catch (error) {
    console.error("Projects metadata yaratma xətası:", error);

    return {
      title: "Layihələr",
      description:
        "Ali Ağayev-in portfolio layihələri. Professional frontend developer tərəfindən hazırlanmış müasir veb layihələri.",
      openGraph: {
        title: "Layihələr - Ali Ağayev Portfolio",
        description: "Professional frontend layihələri.",
        images: [
          {
            url: `https://aghayev.dev/api/og?title=${encodeURIComponent(
              "Layihələr"
            )}`,
            alt: "Portfolio Layihələri",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
}

export default async function page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const pageData = await getPageData("projects", lang as "az" | "en");

  return (
    <div className="w-full">
      <h1 className="mt-24 font-[600] text-66px">{pageData.content.title}</h1>
      <p className="md:w-[25%] w-full h-full text-[#00000080] font-[500]">
        {pageData.content.description}
        <span className="text-black font-[600]">
          {pageData.content.highlightedText}
        </span>
      </p>
      <div className="mt-6">
        <Link href="/contact">
          <CtaButton innerText={pageData.content.buttonInner} mode="email" />
        </Link>
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        <AllProjects />
      </Suspense>
      <div className="absolute w-full left-0 h-full md:mt-0 mt-40">
        <Footer />
      </div>
    </div>
  );
}
