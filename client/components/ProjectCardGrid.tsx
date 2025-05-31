import React from "react";

type ProjectCardGridProps = {
  title: string;
  description: string;
  image: string;
};

const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-lg mb-4"
      />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
};

export default ProjectCardGrid;
