"use client";

import { useEffect, useState } from "react";

export default function LanguageSelector() {
  const [lang, setLang] = useState<"az" | "en">("az");

  useEffect(() => {
    const cookieLang = document.cookie.includes("lang=az") ? "az" : "en";
    setLang(cookieLang);
  }, []);

  const changeLang = (newLang: "az" | "en") => {
    document.cookie = `lang=${newLang}; path=/`;
    window.location.reload();
  };

  return (
    <div className="mb-6">
      <select
        onChange={(e) => changeLang(e.target.value as "az" | "en")}
        value={lang}
        className="border-2 border-black text-black bg-transparent px-4 py-2 rounded-lg font-medium text-[16px] transition-colors duration-300 hover:bg-black hover:text-white"
      >
        <option value="az">AZ</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
