"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Project from "@/types/projectInterface";
import EditProjectModal from "@/components/EditProjectModal";

interface TechStack {
  _id: string;
  name: string;
  icon: string;
}

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeDescId, setActiveDescId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // TODO: Change to real url
  const url = "http://localhost:4000";

  const { loading } = useAuth();
  const handleSave = (updated: Project) => {
    setProjects((prev) =>
      prev.map((proj) => (proj._id === updated._id ? updated : proj))
    );
    console.log("Yenilənmiş layihə:", updated);
    setEditingProject(null);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${url}/api/projects`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const toggleDescription = (id: string) => {
    setActiveDescId((prev) => (prev === id ? null : id));
  };

  if (loading) return <div className="p-4">Yüklənir...</div>;

  console.log("Projects:", projects);

  projects.map((project) => {
    console.log(project.timeLine);
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Projects</h1>
      {projects.length === 0 && (
        <p className="text-center text-gray-500">Henüz proje yok.</p>
      )}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => {
          const isActive = activeDescId === project._id;

          return (
            <div
              key={project._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              <button
                onClick={() => setEditingProject(project)}
                className="text-sm px-3 py-1 my-2 w-1/2 self-center  bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <img
                src={`${url}${project.image}`}
                alt={project.title}
                className="h-48 w-full object-cover"
              />

              <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-xl font-semibold mb-2">{project.title}</h2>

                <h2 className="text-md font-semibold mb-2">
                  {project.timeLine &&
                    Object.entries(project.timeLine).map(([lang, time]) => (
                      <span key={lang} className="text-gray-500">
                        {lang}: {time}
                        <br />
                      </span>
                    ))}
                </h2>

                <button
                  className={`mb-4 p-4 rounded-2xl border transition-colors duration-300 ${
                    isActive
                      ? "bg-black text-white "
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  onClick={() => toggleDescription(project._id)}
                >
                  {isActive ? "Açığlamanı gizlə" : "Açığlamanı göstər"}
                </button>

                {isActive &&
                  Object.entries(project.description).map(([lang, desc]) => (
                    <p
                      key={lang}
                      className="text-gray-600 mb-2 whitespace-pre-line"
                    >
                      {desc}
                    </p>
                  ))}

                <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                  {project.techStack.map((tech) => (
                    <img
                      key={tech._id}
                      src={`${url}${tech.icon}`}
                      alt={tech.name}
                      title={tech.name}
                      className="h-6 w-6"
                    />
                  ))}
                </div>

                <div className="flex justify-between items-center">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm"
                  >
                    GitHub
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:underline text-sm"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {editingProject && (
        <EditProjectModal
          project={editingProject}
          onClose={() => setEditingProject(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default ProjectsPage;
