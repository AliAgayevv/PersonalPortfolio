"use client";

import React, { useState } from "react";

interface Technology {
  name: string;
  iconFile?: File;
}

interface Description {
  az: string;
  en: string;
}

interface TimeLine {
  az: string;
  en: string;
}

const AddProjectForm: React.FC = () => {
  const [projectId, setProjectId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState<Description>({
    az: "",
    en: "",
  });
  const [timeLine, setTimeLine] = useState<TimeLine>({ az: "", en: "" });
  const [githubLink, setGithubLink] = useState("");
  const [liveLink, setLiveLink] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  const addTechnology = () => {
    setTechnologies([...technologies, { name: "", iconFile: undefined }]);
  };

  const updateTechName = (index: number, name: string) => {
    const newTechs = [...technologies];
    newTechs[index].name = name;
    setTechnologies(newTechs);
  };

  const updateTechIcon = (index: number, file?: File) => {
    const newTechs = [...technologies];
    newTechs[index].iconFile = file;
    setTechnologies(newTechs);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (projectId.trim()) {
      formData.append("projectId", projectId);
    }

    formData.append("title", title);
    formData.append("description", JSON.stringify(description));
    formData.append("timeLine", JSON.stringify(timeLine));
    formData.append("githubLink", githubLink);
    formData.append("liveLink", liveLink);

    if (image) {
      formData.append("image", image);
    }

    const techsWithoutFiles = technologies.map(({ name }) => ({ name }));
    formData.append("techStack", JSON.stringify(techsWithoutFiles));

    technologies.forEach((tech, i) => {
      if (tech.iconFile) {
        formData.append(`techStackIcon_${i}`, tech.iconFile);
      }
    });

    try {
      const response = await fetch("https://aghayev.dev/api/projects", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Network response was not ok");

      alert("Project added successfully!");

      setProjectId("");
      setTitle("");
      setDescription({ az: "", en: "" });
      setTimeLine({ az: "", en: "" });
      setGithubLink("");
      setLiveLink("");
      setImage(null);
      setTechnologies([]);
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Error adding project");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 rounded-md space-y-6"
    >
      <h2 className="text-2xl font-bold mb-4">Add New Project</h2>

      {/* Optional Project ID */}
      <label className="block">
        Project ID (optional):
        <input
          type="text"
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          placeholder="Leave empty to auto-generate"
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Title */}
      <label className="block">
        Project Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Description */}
      <div>
        <h3 className="font-semibold mb-1">Description</h3>
        <label className="block mb-2">
          AZ:
          <textarea
            value={description.az}
            onChange={(e) =>
              setDescription({ ...description, az: e.target.value })
            }
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        <label className="block">
          EN:
          <textarea
            value={description.en}
            onChange={(e) =>
              setDescription({ ...description, en: e.target.value })
            }
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
      </div>

      {/* TimeLine */}
      <div>
        <h3 className="font-semibold mb-1">TimeLine</h3>
        <label className="block mb-2">
          AZ:
          <input
            type="text"
            value={timeLine.az}
            onChange={(e) => setTimeLine({ ...timeLine, az: e.target.value })}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
        <label className="block">
          EN:
          <input
            type="text"
            value={timeLine.en}
            onChange={(e) => setTimeLine({ ...timeLine, en: e.target.value })}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </label>
      </div>

      {/* GitHub & Live Links */}
      <label className="block">
        GitHub Link:
        <input
          type="url"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      <label className="block">
        Live Demo Link:
        <input
          type="url"
          value={liveLink}
          onChange={(e) => setLiveLink(e.target.value)}
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Image */}
      <label className="block">
        Project Image:
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          required
          className="w-full border p-2 rounded mt-1"
        />
      </label>

      {/* Technologies */}
      <div>
        <h3 className="font-semibold mb-2">Technologies</h3>
        {technologies.map((tech, idx) => (
          <div key={idx} className="flex items-center gap-3 mb-3">
            <input
              type="text"
              placeholder="Technology Name"
              value={tech.name}
              onChange={(e) => updateTechName(idx, e.target.value)}
              required
              className="border p-2 rounded flex-grow"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => updateTechIcon(idx, e.target.files?.[0])}
              required
              className="border p-2 rounded w-40"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={addTechnology}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Technology
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="mt-6 px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Submit Project
      </button>
    </form>
  );
};

export default AddProjectForm;
