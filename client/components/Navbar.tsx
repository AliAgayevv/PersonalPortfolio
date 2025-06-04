import React from "react";
import LanguageSelector from "./LanguageSelector";
import localFont from "next/font/local";
import NavbarDropdown from "./NavbarDropdown";
import Link from "next/link";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

const Navbar = () => {
  return (
    <nav className=" flex justify-between items-center pt-16 max-h-14 mb-5">
      <Link href="/">
        <h1
          className={`${interFont.className} font-[500] text-[20px] md:text-[36px] text-black `}
        >
          Ali Aghayev
        </h1>
      </Link>
      <div className="flex gap-2 items-center">
        <LanguageSelector />
        <NavbarDropdown />
      </div>
    </nav>
  );
};

export default Navbar;
