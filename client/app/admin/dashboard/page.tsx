"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

const AdminButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
    >
      {children}
    </button>
  );
};

const DashboardPage: React.FC = () => {
  const router = useRouter();
  const { loading, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      window.location.href = "/admin";
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Yüklənir...</p>
        </div>
      </div>
    );
  }

  // If the user is  not authenticated, redirect to the login page
  if (!loading && !isAuthenticated()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            ❌ Giriş icazəniz yoxdur. Login səhifəsinə yönləndirilirsiz...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen  py-8">
      {/* Header with logout */}
      <div className="w-full mx-auto  mb-8">
        <div className="flex justify-between items-center bg-white rounded-lg shadow p-4">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <button
            onClick={logout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
          >
            🚪 Çıxış
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex mt-20 items-center justify-center">
          <div className="text-4xl text-center">
            Xoş gəlmisən <strong>Əli </strong> 👋
            <p className="text-2xl pt-2">Bugün nə etmək istəyirsən?</p>
          </div>
        </div>

        <div className="text-center text-2xl mt-12">
          <div className="flex flex-col md:flex-row justify-center gap-6 mt-8 max-w-2xl mx-auto">
            <AdminButton onClick={() => router.push("/admin/projects")}>
              📁 Proyektləri idarə et
            </AdminButton>
            <AdminButton onClick={() => router.push("/admin/blogs")}>
              📝 Blogları idarə et
            </AdminButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
