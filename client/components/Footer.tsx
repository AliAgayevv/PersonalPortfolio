import { cookies } from "next/headers";
import {
  FaLinkedinIn,
  FaInstagram,
  FaHome,
  // FaTwitter,
  // FaTiktok,
  // FaYoutube,
} from "react-icons/fa";
import dotSVG from "@/public/svg/overlay.svg";
import Image from "next/image";
import Link from "next/link";
import getPageData from "@/lib/getPageData";

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const pageData = await getPageData("footer", lang as "az" | "en");

  console.log("Footer data:", pageData);

  return (
    <footer className="md:absolute md:bottom-0  w-full bg-black text-white">
      {/* Desktop Footer */}
      <div className=" hidden md:block h-96">
        <div className="w-[90%] mx-auto h-full">
          <FooterSocialIcons
            linekdinURL={pageData.content.linkLi}
            instagramURL={pageData.content.linkIg}
          />
          <hr className="bg-[#FFFFFF80]"></hr>
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
                  src={dotSVG || "/placeholder.svg"}
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
              <div>
                <p className="pt-4 pb-2">{pageData.content.grid1Title}</p>
                <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                  {pageData.content.grid1List &&
                    pageData.content.grid1List.map(
                      (item: string, index: number) => (
                        <li
                          className="hover:text-white duration-300 transition-all"
                          key={index}
                        >
                          {item}
                        </li>
                      )
                    )}
                </ul>
              </div>
              <div>
                <p className="pt-4 pb-2">{pageData.content.grid2Title}</p>
                <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                  {pageData.content.grid2List &&
                    pageData.content.grid2List.map(
                      (item: string, index: number) => (
                        <li
                          className="hover:text-white duration-300 transition-all"
                          key={index}
                        >
                          {item}
                        </li>
                      )
                    )}
                </ul>
              </div>
              <div>
                <p className="pt-4 pb-2">{pageData.content.grid3Title}</p>
                <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                  {pageData.content.grid3List &&
                    pageData.content.grid3List.map(
                      (item: string, index: number) => (
                        <li
                          className="hover:text-white duration-300 transition-all"
                          key={index}
                        >
                          {item}
                        </li>
                      )
                    )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Footer */}
      <div className="md:hidden flex flex-col  pb-16">
        <hr className="bg-[#FFFFFF80] opacity-30 "></hr>
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

          <div className="w-full text-center mb-6">
            <h2 className="text-xl mb-4">{pageData.content.grid1Title}</h2>
            <ul className="text-[#FFFFFF80] flex flex-col gap-4">
              {pageData.content.grid1List &&
                pageData.content.grid1List.map(
                  (item: string, index: number) => <li key={index}>{item}</li>
                )}
            </ul>
          </div>

          <div className="w-full text-center mb-6">
            <h2 className="text-xl mb-4">{pageData.content.grid2Title}</h2>
            <ul className="text-[#FFFFFF80] flex flex-col gap-4">
              {pageData.content.grid2List &&
                pageData.content.grid2List.map(
                  (item: string, index: number) => <li key={index}>{item}</li>
                )}
            </ul>
          </div>

          <div className="w-full text-center mb-10">
            <h2 className="text-xl mb-4">{pageData.content.grid3Title}</h2>
            <ul className="text-[#FFFFFF80] flex flex-col gap-4">
              {pageData.content.grid3List &&
                pageData.content.grid3List.map(
                  (item: string, index: number) => <li key={index}>{item}</li>
                )}
            </ul>
          </div>
        </div>

        {/* Mobile Social Icons */}
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
}

export function FooterSocialIcons({
  linekdinURL,
  // mediumURL,
  instagramURL,
}: IFooterSocialIconsProps) {
  console.log("linekdinURL", linekdinURL);
  return (
    <div className="flex  justify-around md:justify-end items-center py-4 gap-0 md:gap-12 ">
      <Link className="w-6 h-6" href="/">
        <FaHome className="w-full h-full" />
      </Link>
      <Link href={linekdinURL as string} className="w-6 h-6" target="_blank">
        <FaLinkedinIn className="w-full h-full" />
      </Link>
      <Link href={instagramURL as string} target="_blank" className="w-6 h-6">
        <FaInstagram className="w-full h-full" />
      </Link>
    </div>
  );
}
