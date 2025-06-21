import { cookies } from "next/headers";

const page = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const translations = {
    az: "Tezliklə ✨",
    en: "Coming soon ✨",
  };

  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 animate-pulse">
          {translations[lang as "az" | "en"] || translations.az}
        </h1>
        <div className="text-lg text-gray-600"></div>
      </div>
    </div>
  );
};

export default page;
