import getProjects from "@/lib/getProjects";
import React from "react";
import { cookies } from "next/headers";
import ProjectCardGrid from "./ProjectCardGrid";
import projectInterface from "@/types/projectInterface";

export default async function AllProjects() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const projectsData = await getProjects(lang as "az" | "en");
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
      {projectsData.map((project: projectInterface) => (
        <ProjectCardGrid {...project} key={project.projectId} />
      ))}
    </div>
  );
}
