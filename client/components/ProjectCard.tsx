import React from "react";

const ProjectCard = ({
  projectName,
  projectDescription,
  projectImage,
  projectLink,
  projectShowenLink,
  projectId,
}: {
  projectName: string;
  projectDescription: string;
  projectImage: string;
  projectLink: string;
  projectShowenLink: string;
  projectId: string;
}) => {
  return (
    <div className="w-full h-[clamp(400px,42.6vw,614px)] bg-black overflow-hidden">
      <img
        src={projectImage}
        alt={projectName}
        className="w-full h-[clamp(250px,38.3vw,528px)] object-cover"
      />
      <div className="flex flex-col justify-between p-5 h-[clamp(150px,10vw,86px)] text-white">
        <h2 className="text-[clamp(16px,1.3vw,20px)] font-bold text-white">
          {projectName}
        </h2>
        <p className="text-[clamp(12px,1vw,14px)] text-gray-300">
          {projectDescription}
        </p>
        <a
          href={projectLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[clamp(12px,1vw,14px)] text-[#B8FF34] hover:underline"
        >
          {projectShowenLink}
        </a>
        <p className="text-[clamp(10px,0.8vw,12px)] text-gray-400">
          Project ID: {projectId}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
