"use client";
import React, { useState } from "react";
import axios from "axios";
import Project from "@/types/projectInterface";
import Image from "next/image";

interface EditProjectModalProps {
  project: Project;
  onClose: () => void;
  onRefresh: () => void;
}

// Type guard funksiyaları
const isRecordWithKey = (
  obj: unknown,
  key: string
): obj is Record<string, unknown> => {
  return typeof obj === "object" && obj !== null && key in obj;
};

const getNestedStringValue = (obj: unknown, key: string): string => {
  if (isRecordWithKey(obj, key) && typeof obj[key] === "string") {
    return obj[key] as string;
  }
  return "";
};

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  onClose,
  onRefresh,
}) => {
  const [formData, setFormData] = useState<Project>({ ...project });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [outer, inner] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [outer]: {
          ...(prev[outer as keyof Project] as Record<string, unknown>),
          [inner]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("githubLink", formData.githubLink);
      form.append("liveLink", formData.liveLink);
      form.append("description", JSON.stringify(formData.description));
      form.append("timeLine", JSON.stringify(formData.timeLine));

      if (imageFile) {
        form.append("image", imageFile);
      }

      const response = await axios.patch(
        `https://aghayev.dev/api/projects/${formData.projectId}`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("✅ PATCH Success:", response.data);
      onRefresh();
      onClose();
    } catch (err: unknown) {
      const errorMessage = axios.isAxiosError(err)
        ? err.response?.data?.message || err.message
        : "Naməlum xəta baş verdi";

      console.error("❌ PATCH error:", err);
      alert("Xəta baş verdi: " + errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 overflow-y-auto">
      <div className="relative bg-white max-w-2xl mx-auto my-12 p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Proyekti redaktə et</h2>
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <div>
            <label className="block mb-1 font-medium">Şəkil</label>
            <div className="flex items-center gap-4">
              <Image
                width={128}
                height={128}
                src={
                  imageFile
                    ? URL.createObjectURL(imageFile)
                    : `https://aghayev.dev${formData.image}`
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
                    setImageFile(file);
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

          <div>
            <label className="block mb-1">Başlıq</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">GitHub Link</label>
            <input
              name="githubLink"
              value={formData.githubLink}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Live Link</label>
            <input
              name="liveLink"
              value={formData.liveLink}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Açıqlama (az)</label>
            <textarea
              name="description.az"
              value={getNestedStringValue(formData.description, "az")}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Açıqlama (en)</label>
            <textarea
              name="description.en"
              value={getNestedStringValue(formData.description, "en")}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Vaxt aralığı (az)</label>
            <textarea
              name="timeLine.az"
              value={getNestedStringValue(formData.timeLine, "az")}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block mb-1">Vaxt aralığı (en)</label>
            <textarea
              name="timeLine.en"
              value={getNestedStringValue(formData.timeLine, "en")}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            disabled={loading}
          >
            Bağla
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Yüklənir..." : "Yadda saxla"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProjectModal;
