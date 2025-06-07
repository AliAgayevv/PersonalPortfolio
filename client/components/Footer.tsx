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

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const res = await fetch("http://localhost:4000/api/pages/footer", {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": lang,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch hero data");
  }

  const data = await res.json();
  console.log("Footer data:", data);

  return (
    <footer className="md:absolute md:bottom-0  w-full bg-black text-white">
      {/* Desktop Footer */}
      <div className=" hidden md:block h-96">
        <div className="w-[90%] mx-auto h-full">
          <FooterSocialIcons
            linekdinURL={data.content.linkLi}
            instagramURL={data.content.linkIg}
          />
          <hr className="bg-[#FFFFFF80]"></hr>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex gap-5 text-16px font-[600] items-center">
                <Link
                  className="text-[#00FF8C] hover:cursor-pointer"
                  href="/contact"
                >
                  {data.content.contactMe}
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
                  {data.content.visitPortfolio}
                </Link>
              </div>
              <h1 className="mt-5 text-[#FFFFFF30] text-40px">
                {data.content.fullName}
              </h1>
            </div>
            <div className="grid grid-cols-3 gap-10 w-1/2 mt-5 text-16px">
              <div>
                <p className="pt-4 pb-2">{data.content.grid1Title}</p>
                <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                  {data.content.grid1List &&
                    data.content.grid1List.map(
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
                <p className="pt-4 pb-2">{data.content.grid2Title}</p>
                <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                  {data.content.grid2List &&
                    data.content.grid2List.map(
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
                <p className="pt-4 pb-2">{data.content.grid3Title}</p>
                <ul className="text-[#FFFFFF80] flex flex-col gap-6 mt-4.5 cursor-pointer">
                  {data.content.grid3List &&
                    data.content.grid3List.map(
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
            {data.content.fullName}
          </h1>

          <div className="flex items-center gap-3 mb-10">
            <Link
              className="text-[#00FF8C] font-medium hover:cursor-pointer"
              href="/contact"
            >
              {data.content.contactMe}
            </Link>
            <span className="text-[#FFFFFF80] text-lg">•</span>
            <Link href="/projects" className="cursor-pointer text-[#FFFFFF80]">
              {data.content.visitPortfolio}
            </Link>
          </div>

          <div className="w-full text-center mb-6">
            <h2 className="text-xl mb-4">{data.content.grid1Title}</h2>
            <ul className="text-[#FFFFFF80] flex flex-col gap-4">
              {data.content.grid1List &&
                data.content.grid1List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>

          <div className="w-full text-center mb-6">
            <h2 className="text-xl mb-4">{data.content.grid2Title}</h2>
            <ul className="text-[#FFFFFF80] flex flex-col gap-4">
              {data.content.grid2List &&
                data.content.grid2List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>

          <div className="w-full text-center mb-10">
            <h2 className="text-xl mb-4">{data.content.grid3Title}</h2>
            <ul className="text-[#FFFFFF80] flex flex-col gap-4">
              {data.content.grid3List &&
                data.content.grid3List.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
            </ul>
          </div>
        </div>

        {/* Mobile Social Icons */}
        <FooterSocialIcons
          linekdinURL={data.content.linkLi}
          instagramURL={data.content.linkIg}
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
