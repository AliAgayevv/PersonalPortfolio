"use client";

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
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
      {children}
    </button>
  );
};

const DashboardPage: React.FC = () => {
  const router = useRouter();

  const { loading } = useAuth();

  if (loading) {
    return <div className="p-4">Yüklənir...</div>;
  }

  return (
    <div>
      <div className="flex mt-20 items-center justify-center">
        <div className="text-4xl text-center">
          Xoş gəlmisən <strong>Əli</strong> 👋
          <p className="text-2xl pt-2">Bugün nə etmək istəyirsən?</p>
        </div>
      </div>
      <div className="text-center text-2xl mt-12">
        <div className="flex  justify-between mt-8 max-w-2xl mx-auto">
          <AdminButton onClick={() => router.push("/admin/projects")}>
            Proyektləri idarə et
          </AdminButton>
          <AdminButton onClick={() => router.push("/admin/blogs")}>
            Blogları idarə et
          </AdminButton>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
