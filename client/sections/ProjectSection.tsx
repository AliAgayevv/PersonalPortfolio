import React from "react";
import { cookies } from "next/headers";
import ProjectCard from "../components/ProjectCard";
import SeeMoreButton from "../components/SeeMoreButton";
import Link from "next/link";

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

  console.log("Fetched projects:", data);

  return (
    <section className="text-white w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="header-text font-[600] uppercase">Projects</h2>
        <div>
          <Link href="/projects" className="text-white">
            <SeeMoreButton innerText="See more" />
          </Link>
        </div>
      </div>
      <div className="grid-cols-1 md:grid-cols-2 grid gap-4">
        {data.map((project: any) => (
          <Link href={`/projects/${project.projectId}`} key={project._id}>
            <ProjectCard
              projectName={project.title}
              projectDescription={project.description}
              projectImage={project.image}
              projectLink={project.link}
              projectShowenLink={project.showenLink}
              projectId={project.projectId}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
