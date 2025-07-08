import { cookies } from "next/headers";
import {
  FaLinkedinIn,
  FaInstagram,
  FaHome,
  FaMedium,
  FaGithub,
} from "react-icons/fa";
import dotSVG from "@/public/svg/overlay.svg";
import Image from "next/image";
import Link from "next/link";
import getPageData from "@/lib/getPageData";

function createFooterLinkMap(): Map<string, string> {
  const links: { [key: string]: string } = {
    "Əsas Səhifə": "/",
    Haqqında: "/about",
    Əlaqə: "/contact",
    Proyektlər: "/projects",
    Home: "/",
    About: "/about",
    Contact: "/contact",
    Projects: "/projects",
  };

  return new Map(Object.entries(links));
}
export default async function Footer() {
  const linksMap = createFooterLinkMap();

  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const pageData = await getPageData("footer", lang as "az" | "en");

  return (
    <footer className="md:absolute md:bottom-0 w-full bg-black text-white">
      {/* Desktop Footer */}
      <div className="hidden md:block h-96">
        <div className="w-[90%] mx-auto h-full">
          <FooterSocialIcons
            linekdinURL={pageData.content.linkLi}
            instagramURL={pageData.content.linkIg}
          />
          <hr className="bg-[#FFFFFF80]" />
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex gap-5 text-16px font-[600] items-center">
                <Link
                  className="text-[#00FF8C] hover:cursor-pointer"
                  href="/contact"
                >
                  {pageData.content.contactMe}
                </Link>
                <Image
                  alt="dot icon"
                  className="w-1.5 h-1.5 items-center justify-center flex"
                  src={dotSVG}
                />
                <Link
                  className="text-[#FFFFFF80] hover:cursor-pointer"
                  href="/projects"
                >
                  {pageData.content.visitPortfolio}
                </Link>
              </div>
              <h1 className="mt-5 text-[#FFFFFF30] text-40px">
                {pageData.content.fullName}
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-10 w-1/2 mt-5 text-16px">
              {[1, 2, 3].map((gridIndex) => {
                const title = pageData.content[`grid${gridIndex}Title`];
                const list = pageData.content[`grid${gridIndex}List`];
                return (
                  <div key={gridIndex}>
                    <p className="pt-4 pb-2">{title}</p>
                    <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                      {list &&
                        list.map((item: string, index: number) => (
                          <li
                            key={index}
                            className="hover:text-white duration-300 transition-all"
                          >
                            <Link href={linksMap.get(item) ?? "#"}>{item}</Link>
                          </li>
                        ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden flex flex-col pb-16">
        <hr className="bg-[#FFFFFF80] opacity-30" />
        <div className="flex-1 flex flex-col items-center px-6 pt-10">
          <h1 className="text-[#FFFFFF80] text-2xl mb-8">
            {pageData.content.fullName}
          </h1>

          <div className="flex items-center gap-3 mb-10">
            <Link
              className="text-[#00FF8C] font-medium hover:cursor-pointer"
              href="/contact"
            >
              {pageData.content.contactMe}
            </Link>
            <span className="text-[#FFFFFF80] text-lg">•</span>
            <Link href="/projects" className="cursor-pointer text-[#FFFFFF80]">
              {pageData.content.visitPortfolio}
            </Link>
          </div>

          {[1, 2, 3].map((gridIndex) => {
            const title = pageData.content[`grid${gridIndex}Title`];
            const list = pageData.content[`grid${gridIndex}List`];
            return (
              <div className="w-full text-center mb-6" key={gridIndex}>
                <h2 className="text-xl mb-4">{title}</h2>
                <ul className="text-[#FFFFFF80] flex flex-col gap-4">
                  {list &&
                    list.map((item: string, index: number) => (
                      <li key={index}>
                        <Link href={linksMap.get(item) ?? "#"}>{item}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            );
          })}
        </div>

        <FooterSocialIcons
          linekdinURL={pageData.content.linkLi}
          instagramURL={pageData.content.linkIg}
        />
      </div>
    </footer>
  );
}

interface IFooterSocialIconsProps {
  linekdinURL?: string;
  mediumURL?: string;
  instagramURL?: string;
  githubURL?: string;
}

export function FooterSocialIcons({
  linekdinURL,
  instagramURL,
  mediumURL,
  githubURL,
}: IFooterSocialIconsProps) {
  return (
    <div className="flex justify-around md:justify-end items-center py-4 gap-0 md:gap-12">
      <Link className="w-6 h-6" href="/">
        <FaHome className="w-full h-full" />
      </Link>
      {linekdinURL && (
        <Link
          href={linekdinURL}
          className="w-6 h-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedinIn className="w-full h-full" />
        </Link>
      )}
      {instagramURL && (
        <Link
          href={instagramURL}
          className="w-6 h-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="w-full h-full" />
        </Link>
      )}
      {mediumURL && (
        <Link
          href={mediumURL}
          className="w-6 h-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaMedium className="w-full h-full" />
        </Link>
      )}

      {githubURL && (
        <Link
          href={githubURL}
          className="w-6 h-6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="w-full h-full" />
        </Link>
      )}
    </div>
  );
}
