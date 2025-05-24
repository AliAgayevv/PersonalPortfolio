import React from "react";
import { cookies } from "next/headers";
import ProjectCard from "../components/ProjectCard";
import SeeMoreButton from "../components/SeeMoreButton";

export default async function ProjectSection() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("language")?.value || "az";

  const res = await fetch("http://localhost:4000/api/projects", {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch projects:", res.statusText);
    return <p className="text-red-500">Failed to load projects</p>;
  }

  const data = await res.json();

  console.log("Projects response:", res);

  return (
    <section className="text-white w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="header-text font-[600] uppercase">Projects</h2>
        <div>
          <SeeMoreButton innerText="See more" />
        </div>
      </div>
      <div className="grid-cols-2 grid gap-4">
        {data.map((project) => (
          <ProjectCard
            key={project._id}
            projectId={project.projectId}
            projectName={project.title}
            projectDescription={project.description}
            projectImage={project.image}
          />
        ))}
      </div>
    </section>
  );
}
