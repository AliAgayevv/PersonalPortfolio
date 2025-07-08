export default interface Project {
  _id: string;
  title: string;
  projectId: string;
  description: Record<string, unknown>;
  githubLink: string;
  liveLink: string;
  timeLine: Record<string, string>;
  image: string;
  techStack: projectTechInterface[];
  createdAt: string;
  updatedAt: string;
}

export interface projectTechInterface {
  _id: string;
  name: string;
  icon: string;
}
