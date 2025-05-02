import React from "react";
import LanguageSelector from "./LanguageSelector";
import localFont from "next/font/local";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

const Navbar = () => {
  return (
    <nav className="bg-transparent flex justify-between items-center p-6">
      <h1
        className={`${interFont.className} font-[500] text-[36px] text-black `}
      >
        Ali Aghayev
      </h1>
      <div className="flex gap-2 items-center">
        <LanguageSelector />
        <p>navbarOpenet</p>
      </div>
    </nav>
  );
};

export default Navbar;
