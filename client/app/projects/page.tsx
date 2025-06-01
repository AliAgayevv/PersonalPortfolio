import CtaButton from "@/components/CtaButton";
import Footer from "@/components/Footer";
import React from "react";
import { cookies } from "next/headers";
import ProjectCardGrid from "@/components/ProjectCardGrid";

export default async function page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const pageRes = await fetch("http://localhost:4000/api/pages/projects", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  const projectsRes = await fetch("http://localhost:4000/api/projects", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });
  if (!projectsRes.ok) {
    throw new Error("Failed to fetch projects data");
  }

  if (!pageRes.ok) {
    throw new Error("Failed to fetch hero data");
  }

  const pageData = await pageRes.json();
  const projectsData = await projectsRes.json();

  if (!projectsData) {
    throw new Error("No projects data found");
  }

  return (
    <div className=" w-full">
      <h1 className="mt-24 font-[600] text-66px">{pageData.content.title}</h1>
      <p className="w-[25%] h-full text-[#00000080] font-[500]">
        {pageData.content.description}
        <span className="text-black font-[600]">
          {pageData.content.highlightedText}
        </span>
      </p>
      <div className="mt-6">
        <CtaButton innerText={pageData.content.buttonInner} mode="email" />
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
        {projectsData.slice(0, 1).map((project: any) => (
          <ProjectCardGrid {...project} key={project.projectId} />
        ))}
      </div>
      <div className=" absolute w-full left-0 h-full ">
        <Footer />
      </div>
    </div>
  );
}
