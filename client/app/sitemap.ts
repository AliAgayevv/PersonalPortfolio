import type { MetadataRoute } from "next";
import getProjects from "@/lib/getProjects";
import projectInterface from "../types/projectInterface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("az");

  const projectUrls = projects.map((project: projectInterface) => ({
    //TODO: change the URL to your actual project URL
    url: `http://45.85.146.73:5000/projects/${project.projectId}`,
    lastModified: new Date(project.updatedAt || project.createdAt),
  }));

  return [
    {
      url: `https://aghayev.dev`,
      lastModified: new Date(),
    },
    {
      url: `https://aghayev.dev/about`,
      lastModified: new Date(),
    },
    {
      url: `https://aghayev.dev/contact`,
      lastModified: new Date(),
    },

    {
      url: `https://aghayev.dev/projects`,
      lastModified: new Date(),
    },

    ...projectUrls,
  ];
}
