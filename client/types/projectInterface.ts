export default interface projectInterface {
  _id: string;
  projectId: string;
  title: string;
  description: string;
  image: string;
  techStack: projectTechInterface[];
  liveLink: string;
  githubLink: string;
  timeLine: string;
  createdAt: string;
  updatedAt: string;
}

export interface projectTechInterface {
  _id: string;
  name: string;
  icon: string;
}
