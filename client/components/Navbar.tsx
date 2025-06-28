import React from "react";
import LanguageSelector from "./LanguageSelector";
import localFont from "next/font/local";
import NavbarDropdown from "./NavbarDropdown";
import Link from "next/link";
import { cookies } from "next/headers";

const interFont = localFont({
  src: "../public/fonts/Inter.ttf",
});

const Navbar = async () => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
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
        <NavbarDropdown lang={lang as "az" | "en"} />
      </div>
    </nav>
  );
};

export default Navbar;
