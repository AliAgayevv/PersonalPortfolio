import React from "react";
import { cookies } from "next/headers";
import { FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import dotSVG from "@/public/svg/overlay.svg";
import Image from "next/image";

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

  return (
    <footer className="w-full bg-black h-96 text-5xl text-white ">
      <div className="w-[95%] mx-auto h-96 ">
        <div className="flex items-center justify-end my-5 mr-10">
          <div className="flex gap-5">
            {/* REPLACE WITH SOCAIL MEDIA LOGO IMAGES WHITE COLOR SVG */}
            <a
              href={data.content.linkLi}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="w-8 h-8" />
            </a>
            <a
              href={data.content.linkIg}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-8 h-8" />
            </a>
          </div>
        </div>
        <hr className=" bg-[#FFFFFF80]"></hr>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex gap-5 text-16px font-[600] items-center">
              <p className="text-[#00FF8C]">{data.content.contactMe}</p>
              <Image
                alt="dot icon"
                className="w-1.5 h-1.5 items-center justify-center flex"
                src={dotSVG}
              />
              <p className="text-[#FFFFFF80]">{data.content.visitPortfolio}</p>
            </div>
            <h1 className="mt-5 text-[#FFFFFF30]">{data.content.fullName}</h1>
          </div>
          <div className="grid grid-cols-3 gap-10  w-1/2 mt-5 text-16px">
            <div>
              <p className="pt-4 pb-2">{data.content.grid1Title}</p>
              <ul className="text-[#FFFFFF80]  flex flex-col gap-6 mt-4.5 cursor-pointer">
                {data.content.grid1List &&
                  data.content.grid1List.map((item: string, index: number) => (
                    <li
                      className="hover:text-white duration-300 transition-all"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="pt-4 pb-2">{data.content.grid2Title}</p>
              <ul className="text-[#FFFFFF80]  flex flex-col gap-6 mt-4.5 cursor-pointer">
                {data.content.grid2List &&
                  data.content.grid2List.map((item: string, index: number) => (
                    <li
                      className="hover:text-white duration-300 transition-all"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
            <div>
              <p className="pt-4 pb-2">{data.content.grid3Title}</p>
              <ul className="text-[#FFFFFF80]  flex flex-col gap-6 mt-4.5 cursor-pointer">
                {data.content.grid3List &&
                  data.content.grid3List.map((item: string, index: number) => (
                    <li
                      className="hover:text-white duration-300 transition-all"
                      key={index}
                    >
                      {item}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
