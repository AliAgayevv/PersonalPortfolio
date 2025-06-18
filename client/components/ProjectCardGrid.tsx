import Image from "next/image";
import Link from "next/link";
import React from "react";
// import dynamic from "next/dynamic";

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
      <div className="group w-full aspect-square  overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 flex flex-col relative">
        <div className="w-full h-full relative">
          <div className="hidden md:block w-full h-full">
            <Image
              src={`http://:5000${image}`}
              alt={title}
              width={800}
              height={800}
              className="w-full h-full object-cover  transition-all duration-300"
              priority
            />
          </div>
          <div className="block md:hidden w-full h-full">
            <Image
              src={`http://:5000${image}`}
              alt={title}
              width={800}
              height={800}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-24 flex items-center p-4 bg-[#070707] text-[#FFE9E0]">
          <h2 className="text-36px font-[600]">{title}</h2>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCardGrid;
