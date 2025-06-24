import React, { useState } from "react";
import Project from "@/types/projectInterface";

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState<Project>({ ...project });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 bg-opacity overflow-y-auto ">
      <div className="relative bg-white w-full max-w-2xl mx-auto my-12 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Proyekti redaktə et</h2>

        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          {/* Şəkil */}
          <div>
            <label className="block mb-1 font-medium">Şəkil</label>
            <div className="flex items-center gap-4 flex-wrap">
              <img
                src={
                  typeof formData.image === "string"
                    ? `http://localhost:4000${formData.image}`
                    : URL.createObjectURL(formData.image)
                }
                alt="Preview"
                className="w-32 h-32 object-cover rounded border"
              />
              <input
                type="file"
                accept="image/*"
                id="image-upload"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setFormData((prev) => ({
                      ...prev,
                      image: file as any,
                    }));
                  }
                }}
              />
              <button
                type="button"
                onClick={() => document.getElementById("image-upload")?.click()}
                className="px-4 py-2 bg-gray-200 text-sm rounded hover:bg-gray-300"
              >
                Şəkli dəyiş
              </button>
            </div>
          </div>

          {/* Başlıq */}
          <div>
            <label className="block mb-1 font-medium">Başlıq</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="Başlıq"
            />
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block mb-1 font-medium">GitHub Link</label>
            <input
              name="githubLink"
              value={formData.githubLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://github.com/..."
            />
          </div>

          {/* Live Demo Link */}
          <div>
            <label className="block mb-1 font-medium">Live Demo Link</label>
            <input
              name="liveLink"
              value={formData.liveLink}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://..."
            />
          </div>

          {/* Açıqlama AZ */}
          <div>
            <label className="block mb-1 font-medium">Açıqlama (az)</label>
            <textarea
              name="description.az"
              value={(formData.description as any)?.az || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: {
                    ...prev.description,
                    az: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="Layihənin Azərbaycan dilində açıqlaması"
            />
          </div>

          {/* Açıqlama EN */}
          <div>
            <label className="block mb-1 font-medium">Açıqlama (en)</label>
            <textarea
              name="description.en"
              value={(formData.description as any)?.en || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: {
                    ...prev.description,
                    en: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="Project description in English"
            />
          </div>

          {/* Timeline AZ */}
          <div>
            <label className="block mb-1 font-medium">Vaxt aralığı (az)</label>
            <textarea
              name="timeLine.az"
              value={(formData.timeLine as any)?.az || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timeLine: {
                    ...prev.timeLine,
                    az: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="Layihənin görülmə müddəti (az)"
            />
          </div>

          {/* Timeline EN */}
          <div>
            <label className="block mb-1 font-medium">Vaxt aralığı (en)</label>
            <textarea
              name="timeLine.en"
              value={(formData.timeLine as any)?.en || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  timeLine: {
                    ...prev.timeLine,
                    en: e.target.value,
                  },
                }))
              }
              className="w-full p-2 border rounded"
              placeholder="Project duration (en)"
            />
          </div>
        </div>

        {/* Footer buttons */}
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Bağla
          </button>
          <button
            onClick={() => onSave(formData)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Yadda saxla
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
