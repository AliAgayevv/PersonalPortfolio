import type { MetadataRoute } from "next";
import getUrl from "../lib/getUrl";
import getProjects from "@/lib/getProjects";
import projectInterface from "../types/projectInterface";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await getProjects("az");

  const projectUrls = projects.map((project: projectInterface) => ({
    url: `${getUrl()}/projects/${project.projectId}`,
    lastModified: new Date(project.updatedAt || project.createdAt),
  }));

  const url = getUrl();
  return [
    {
      url: `${url}`, // TODO: Replace with your actual domain
      lastModified: new Date(),
    },
    {
      url: `${url}/about`,
      lastModified: new Date(),
    },
    {
      url: `${url}/contact`,
      lastModified: new Date(),
    },

    {
      url: `${url}/projects`,
      lastModified: new Date(),
    },

    ...projectUrls,
  ];
}
