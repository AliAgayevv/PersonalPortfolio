"use client";

import { useEffect, useState } from "react";
import Project from "@/types/projectInterface";
import EditProjectModal from "@/components/EditProjectModal";
import AddProjectForm from "@/components/AddProjectForm";

const ProjectsPage: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeDescId, setActiveDescId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const url = "http://localhost:4000";

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

  useEffect(() => {
    fetchProjects();
  }, []);

  const toggleDescription = (id: string) => {
    setActiveDescId((prev) => (prev === id ? null : id));
  };

  const deleteProject = async (id: string) => {
    const confirmed = confirm("Bu layihəni silmək istədiyinizə əminsiniz?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://aghayev.dev/api/projects/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Silinmə uğursuz oldu");

      await fetchProjects(); // Silmədən sonra listi yenilə
    } catch (error) {
      console.error("Layihə silinərkən xəta baş verdi:", error);
      alert("Layihəni silmək mümkün olmadı.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Projects</h1>

      {/* Yeni Layihə Əlavə Et düyməsi */}
      <div className="text-center mb-8">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Yeni Layihə Əlavə Et
        </button>
      </div>

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
              <img
                src={`https://aghayev.dev${project.image}`}
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
                      ? "bg-black text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  onClick={() => toggleDescription(project._id)}
                >
                  {isActive ? "Açıqlamanı gizlə" : "Açıqlamanı göstər"}
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

                <div className="flex justify-between items-center mt-2">
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

                <button
                  onClick={() => setSelectedProject(project)}
                  className="mt-3 px-3 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-sm"
                >
                  Redaktə et
                </button>
              </div>
              <button
                onClick={() => deleteProject(project.projectId)}
                className="mt-2 px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-sm text-white"
              >
                Sil
              </button>
            </div>
          );
        })}
      </div>

      {selectedProject && (
        <EditProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onRefresh={() => {
            fetchProjects();
            setSelectedProject(null);
          }}
        />
      )}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full relative h-11/12 overflow-y-auto">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-2 right-2 text-gray-700 hover:text-gray-900 text-xl font-bold"
              aria-label="Close modal"
            >
              &times;
            </button>
            <AddProjectForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;
