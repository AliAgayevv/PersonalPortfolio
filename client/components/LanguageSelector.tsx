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
    <div className="">
      <select
        onChange={(e) => changeLang(e.target.value as "az" | "en")}
        value={lang}
        className="border-2 border-[#001011]/10 text-black bg-transparent px-4 py-2 rounded-[10px] font-medium text-[16px] transition-all duration-300 hover:bg-black hover:text-white hover:cursor-pointer"
      >
        <option value="az">AZ</option>
        <option value="en">EN</option>
      </select>
    </div>
  );
}
