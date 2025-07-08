"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { BlogService } from "@/services/blog.service";
import Link from "next/link";
import AuthWrapper from "@/components/admin/AuthWrapper";
import Image from "next/image";

interface BlogFormData {
  blogId: string;
  blogTitle: {
    az: string;
    en: string;
  };
  blogDescription: {
    az: string;
    en: string;
  };
  blogContent: {
    az: string;
    en: string;
  };
  blogCreatedTime: {
    az: string;
    en: string;
  };
  author: string;
  tags: string[];
  images: string[];
  isPublished: boolean;
}

const EditBlogPageContent: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const blogId = params.id as string;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState<BlogFormData>({
    blogId: "",
    blogTitle: { az: "", en: "" },
    blogDescription: { az: "", en: "" },
    blogContent: { az: "", en: "" },
    blogCreatedTime: { az: "", en: "" },
    author: "",
    tags: [],
    images: [],
    isPublished: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [imageInput, setImageInput] = useState("");

  useEffect(() => {
    if (blogId) {
      fetchBlogData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogId]);

  const fetchBlogData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await BlogService.fetchSingleBlogAdmin(
        blogId,
        "az",
        "json"
      );

      if (response.success) {
        const blog = response.data;
        setFormData({
          blogId: blog.id,
          blogTitle: blog.blogTitle || { az: "", en: "" },
          blogDescription: blog.blogDescription || { az: "", en: "" },
          blogContent: blog.blogContent || { az: "", en: "" },
          blogCreatedTime: blog.blogCreatedTime || { az: "", en: "" },
          author: blog.author || "",
          tags: blog.tags || [],
          images: blog.images || [],
          isPublished: blog.isPublished || false,
        });
      } else {
        setNotFound(true);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Server ilə əlaqə xətası";
      setError(errorMessage);
      console.error("Error fetching blog:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = <K extends keyof BlogFormData>(
    field: K,
    value: BlogFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleLanguageInputChange = (
    field: "blogTitle" | "blogDescription" | "blogContent" | "blogCreatedTime",
    lang: "az" | "en",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [lang]: value },
    }));
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index),
    }));
  };

  const addImage = () => {
    if (imageInput.trim() && !formData.images.includes(imageInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, imageInput.trim()],
      }));
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.blogId.trim()) {
      setError("Blog ID məcburidir");
      return false;
    }
    if (!formData.blogTitle.az.trim() || !formData.blogTitle.en.trim()) {
      setError("Hər iki dildə başlıq məcburidir");
      return false;
    }
    if (
      !formData.blogDescription.az.trim() ||
      !formData.blogDescription.en.trim()
    ) {
      setError("Hər iki dildə təsvir məcburidir");
      return false;
    }
    if (!formData.blogContent.az.trim() || !formData.blogContent.en.trim()) {
      setError("Hər iki dildə məzmun məcburidir");
      return false;
    }
    if (!formData.author.trim()) {
      setError("Müəllif adı məcburidir");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent, isDraft: boolean = false) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);

    const submitData = { ...formData, isPublished: !isDraft };

    try {
      const result = await BlogService.updateBlog(blogId, submitData);

      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/blogs");
        }, 2000);
      } else {
        setError(result.message || "Blog yenilənərkən xəta baş verdi");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Server ilə əlaqə xətası";
      setError(errorMessage);
      console.error("Error updating blog:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Bu bloqu silmək istədiyinizdən əminsiniz? Bu əməliyyat geri alına bilməz."
      )
    ) {
      return;
    }

    try {
      const result = await BlogService.deleteBlog(blogId);

      if (result.success) {
        alert("Blog uğurla silindi");
        router.push("/admin/blogs");
      } else {
        setError(result.message || "Blog silinərkən xəta baş verdi");
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Server ilə əlaqə xətası";
      setError(errorMessage);
      console.error("Error deleting blog:", err);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Yüklənir...</p>
        </div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          ❌ Blog tapılmadı
        </div>
        <Link
          href="/admin/blogs"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Admin panelinə qayıt
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          ✅ Blog uğurla yeniləndi! Admin panelinə yönləndirilirsiz...
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/blogs"
              className="text-blue-600 hover:text-blue-800"
            >
              ← Geri
            </Link>
            <h1 className="text-3xl font-bold">Blog Redaktə Et</h1>
          </div>

          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            🗑️ Sil
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800">
            <strong>Blog ID:</strong> {formData.blogId}
          </p>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <form onSubmit={(e) => handleSubmit(e)} className="space-y-8">
        {/* Başlıqlar */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Başlıqlar</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlıq (Azərbaycanca) *
              </label>
              <input
                type="text"
                value={formData.blogTitle.az}
                onChange={(e) =>
                  handleLanguageInputChange("blogTitle", "az", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Başlıq (İngiliscə) *
              </label>
              <input
                type="text"
                value={formData.blogTitle.en}
                onChange={(e) =>
                  handleLanguageInputChange("blogTitle", "en", e.target.value)
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Təsvirlər */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Təsvirlər</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Təsvir (Azərbaycanca) *
              </label>
              <textarea
                value={formData.blogDescription.az}
                onChange={(e) =>
                  handleLanguageInputChange(
                    "blogDescription",
                    "az",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Təsvir (İngiliscə) *
              </label>
              <textarea
                value={formData.blogDescription.en}
                onChange={(e) =>
                  handleLanguageInputChange(
                    "blogDescription",
                    "en",
                    e.target.value
                  )
                }
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>

        {/* Məzmun */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Məzmun (Markdown)</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Məzmun (Azərbaycanca) *
              </label>
              <textarea
                value={formData.blogContent.az}
                onChange={(e) =>
                  handleLanguageInputChange("blogContent", "az", e.target.value)
                }
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Məzmun (İngiliscə) *
              </label>
              <textarea
                value={formData.blogContent.en}
                onChange={(e) =>
                  handleLanguageInputChange("blogContent", "en", e.target.value)
                }
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                required
              />
            </div>
          </div>
        </div>

        {/* Müəllif və Tarixlər */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Müəllif və Tarixlər</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Müəllif *
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => handleInputChange("author", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarix (Azərbaycanca)
              </label>
              <input
                type="text"
                value={formData.blogCreatedTime.az}
                onChange={(e) =>
                  handleLanguageInputChange(
                    "blogCreatedTime",
                    "az",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tarix (İngiliscə)
              </label>
              <input
                type="text"
                value={formData.blogCreatedTime.en}
                onChange={(e) =>
                  handleLanguageInputChange(
                    "blogCreatedTime",
                    "en",
                    e.target.value
                  )
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Tag-lar</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addTag())
              }
              placeholder="Tag əlavə edin..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Əlavə et
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center gap-2"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => removeTag(index)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Şəkillər</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="url"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && (e.preventDefault(), addImage())
              }
              placeholder="Şəkil URL-i əlavə edin..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={addImage}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Əlavə et
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {formData.images.map((image, index) => (
              <div key={index} className="relative border rounded-lg p-2">
                <Image
                  width={256}
                  height={128}
                  src={image}
                  alt={`Şəkil ${index + 1}`}
                  className="w-full h-32 object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <p className="text-xs text-gray-600 mt-2 break-all">{image}</p>
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Publish Settings */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Nəşr Parametrləri</h2>
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isPublished"
              checked={formData.isPublished}
              onChange={(e) =>
                handleInputChange("isPublished", e.target.checked)
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="isPublished"
              className="text-sm font-medium text-gray-700"
            >
              Bu bloqu nəşr et
            </label>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {formData.isPublished
              ? "✅ Blog nəşr edilib və hamı tərəfindən görünə bilər"
              : "⏸️ Blog qaralama kimi saxlanılıb və yalnız admin tərəfindən görünəcək"}
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-between items-center bg-white rounded-lg shadow p-6">
          <div className="flex gap-3">
            <Link
              href="/admin/blogs"
              className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Ləğv et
            </Link>

            <button
              type="button"
              onClick={handleDelete}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              🗑️ Sil
            </button>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={(e) => handleSubmit(e, true)}
              disabled={isSubmitting}
              className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Saxlanılır..." : "Qaralama et"}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
            >
              {isSubmitting ? "Yenilənir..." : "Yenilə və Nəşr et"}
            </button>
          </div>
        </div>
      </form>

      {/* Preview Section */}
      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Önizləmə</h3>
        <div className="bg-white rounded-lg p-4 border">
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`px-2 py-1 rounded text-sm text-white ${
                formData.isPublished ? "bg-green-500" : "bg-yellow-500"
              }`}
            >
              {formData.isPublished ? "Nəşr edilib" : "Qaralama"}
            </span>
            <span className="text-sm text-gray-500">ID: {formData.blogId}</span>
          </div>
          <h4 className="text-xl font-bold mb-2">
            {formData.blogTitle.az || "Blog başlığı..."}
          </h4>
          <p className="text-gray-600 mb-3">
            {formData.blogDescription.az || "Blog təsviri..."}
          </p>
          <div className="flex flex-wrap gap-1 mb-3">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500">
            📅 {formData.blogCreatedTime.az} • ✍️ {formData.author}
          </div>
          {formData.images.length > 0 && (
            <div className="mt-3 flex gap-2">
              {formData.images.slice(0, 3).map((image, index) => (
                <Image
                  width={64}
                  height={64}
                  key={index}
                  src={image}
                  alt={`Preview ${index + 1}`}
                  className="w-16 h-16 object-cover rounded"
                />
              ))}
              {formData.images.length > 3 && (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs">
                  +{formData.images.length - 3}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action History */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Blog Məlumatları</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-gray-700">Blog ID:</span>
            <span className="ml-2 text-gray-600">{formData.blogId}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Status:</span>
            <span
              className={`ml-2 px-2 py-1 rounded text-xs ${
                formData.isPublished
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {formData.isPublished ? "Nəşr edilib" : "Qaralama"}
            </span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Tag sayı:</span>
            <span className="ml-2 text-gray-600">{formData.tags.length}</span>
          </div>
          <div>
            <span className="font-medium text-gray-700">Şəkil sayı:</span>
            <span className="ml-2 text-gray-600">{formData.images.length}</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              href={`/blog/${formData.blogId}`}
              target="_blank"
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
            >
              👁️ Bloqu görüntülə
            </Link>

            <div className="text-xs text-gray-500">
              Son redaktə: {new Date().toLocaleString("az-AZ")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// AuthWrapper ilə qorunan səhifə
const EditBlogPage: React.FC = () => {
  return (
    <AuthWrapper>
      <EditBlogPageContent />
    </AuthWrapper>
  );
};

export default EditBlogPage;
