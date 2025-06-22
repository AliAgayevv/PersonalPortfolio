import React from "react";
import { cookies } from "next/headers";
import ProjectCard from "../components/ProjectCard";
import SeeMoreButton from "../components/SeeMoreButton";
import Link from "next/link";
import AnimationAllChildren from "@/components/animations/AnimationAllChildren";
import getUrl from "@/lib/getUrl";

export default async function ProjectSection() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const url = getUrl();
  const res = await fetch(`${url}/api/projects`, {
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

  return (
    <section className="text-white w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-10">
        <h2 className="header-text font-[600] uppercase">
          {lang === "az" ? "Proyektlər" : "Projects"}
        </h2>
        <div>
          <Link href="/projects" className="text-white">
            <SeeMoreButton innerText="See more" />
          </Link>
        </div>
      </div>
      <AnimationAllChildren
        parentVariant={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        childVariant={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          },
        }}
      >
        {data.map((project: any) => (
          <Link href={`/projects/${project.projectId}`} key={project._id}>
            <ProjectCard
              projectName={project.title}
              projectDescription={project.description}
              projectImage={project.image}
              // projectLink={project.link}
              // projectShowenLink={project.showenLink}
              projectId={project.projectId}
            />
          </Link>
        ))}
      </AnimationAllChildren>
    </section>
  );
}
