import getUrl from "@/lib/getUrl";
import Image from "next/image";
// import Link from "next/link";
import React from "react";

const ProjectCard = ({
  projectName,
  projectDescription,
  projectImage,
  // projectLink,
  // projectShowenLink,
  projectId,
}: {
  projectName: string;
  projectDescription: string;
  projectImage: string;
  // projectLink: string;
  // projectShowenLink: string;
  projectId: string;
}) => {
  const url = getUrl();
  return (
    <div className="w-full h-full bg-black overflow-hidden ">
      {/* <img
        src={projectImage}
        alt={projectName}
        className="w-full h-[clamp(250px,38.3vw,528px)] object-cover"
      /> */}
      <Image
        src={`${url}${projectImage}`}
        alt={projectName}
        width={800}
        height={450}
        className="w-full h-[clamp(250px,38.3vw,528px)] object-cover"
        priority
      />
      <div className="flex flex-col justify-between pt-3 h-[clamp(150px,10vw,86px)] text-white">
        <h2 className="text-[clamp(16px,1.3vw,20px)]  font-bold text-white">
          {projectName}
        </h2>
        <p className="text-[clamp(12px,1vw,14px)] text-gray-300">
          {projectDescription}
        </p>

        <p className="text-[clamp(10px,0.8vw,12px)] text-gray-400">
          Project ID: {projectId}
        </p>
      </div>
    </div>
  );
};

export default ProjectCard;
