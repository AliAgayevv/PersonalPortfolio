import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProjectCardGridProps = {
  title: string;
  image: string;
  projectId: string;
};

const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({
  title,
  image,
  projectId,
}) => {
  return (
    <Link href={`/projects/${projectId}`}>
      <div className="w-full aspect-square  bg-blue-500 overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative">
        <div className="w-full h-full ">
          {/* <img src={image} className="w-full h-full object-cover" /> */}
          <Image
            src={`http://localhost:4000${image}`}
            alt={title}
            width={800}
            height={800}
            className="w-full h-full object-cover"
            priority
          />
        </div>
        <div className="absolute bottom-0 left-0  w-full h-24 flex items-center p-4  bg-[#070707] text-[#FFE9E0] ">
          <h2 className="text-36px  font-[600]">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardGrid;
