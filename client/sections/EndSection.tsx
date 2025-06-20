import React from "react";
import { cookies } from "next/headers";
import { FaLinkedin } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";
import socialMediaDatas from "@/data/socialMedia.json";

export default async function EndSection() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";

  const res = await fetch("http://localhost:4000/api/pages/endSection", {
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

  console.log("EndSection Data:", data);
  return (
    <section className="w-[90%] mx-auto text-white my-40 pb-0 md:pb-40 h-full ">
      <h1 className="text-center font-bold end-text w-full uppercase">
        {data.content.sectionText}
      </h1>
      <div className="w-full h-full mb-40 bg-[#f5f5f5] rounded-2xl flex justify-center items-center flex-col text-black gap-3 py-14 mt-4">
        <div className="size-28 bg-gray-200 rounded-full flex justify-center items-center border-black border-6  text-black ">
          <Image
            width={200}
            height={200}
            src={`http://localhost:4000${data.photos}`}
            alt="End Section Image"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <div className="text-center w-full">
          <h2 className="text-40px font-bold">{data.content.title}</h2>
          <p
            className="text-[#00000080] text-20px text-center w-full md:w-[50%] mx-auto mt-2 mb-5 px-4"
            style={{
              wordBreak: "break-all",
            }}
          >
            loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
            loremloremloremlorem
          </p>
        </div>
        <div className="flex justify-center items-center flex-col md:flex-row gap-4 pb-4 ">
          <Link
            href={socialMediaDatas.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="  rounded-2xl bg-black text-white p-4 flex justify-center items-center gap-1 shadow-2xl shadow-black/30 hover:shadow-black/70 transition-all duration-300">
              {data.content.followButton}
              <FaLinkedin />
              <p className="ml-1">
                <BsArrowUpRight size={14} />
              </p>
            </button>
          </Link>
          <a
            href={`mailto:${socialMediaDatas.gmail}`}
            className="w-60 rounded-2xl text-black bg-white flex justify-center items-center gap-1 border p-4 border-gray-300 shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all duration-300"
          >
            {data.content.emailButton}
            <TfiEmail size={14} className="ml-1" />
          </a>
        </div>
      </div>
    </section>
  );
}
