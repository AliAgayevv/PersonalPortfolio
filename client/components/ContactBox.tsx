import getPageData from "@/lib/getPageData";
import Image from "next/image";
import React from "react";
import { cookies } from "next/headers";
import getUrl from "@/lib/getUrl";
import socialMediaDatas from "@/data/socialMedia.json";
import Link from "next/link";

import { FaGithub, FaInstagram, FaLinkedinIn, FaMediumM } from "react-icons/fa";

const ContactBox = async ({
  title,
  description,
}: {
  title?: string;
  description?: string;
}) => {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const backendUrl = getUrl();

  const res = await getPageData("hero", lang as "az" | "en");
  const photoFromBackend = res.photos;
  return (
    <div className="w-full md:w-1/3 bg-[#F5F5F5] h-full p-6 text-black rounded-2xl">
      <div className="rounded-full size-20 border-black border-5">
        <Image
          src={`${backendUrl}${photoFromBackend}`}
          alt="Photo of Ali"
          width={100}
          height={100}
          className="w-full h-full object-cover rounded-full"
          priority
          quality={100}
        />
      </div>
      <h3 className="text-20px font-[600] mt-6">{title}</h3>
      <p className="text-[#00000080] w-full font-[400] text-14px">
        {description}
      </p>
      <div className="flex  justify-around  items-center py-4 gap-0 md:gap-12 ">
        <Link
          href={socialMediaDatas.linkedin}
          className="w-6 h-6"
          target="_blank"
        >
          <FaLinkedinIn className="w-full h-full" color="#00000080" />
        </Link>
        <Link
          href={socialMediaDatas.instagram}
          target="_blank"
          className="w-6 h-6"
        >
          <FaInstagram className="w-full h-full" color="#00000080" />
        </Link>
        <Link
          href={socialMediaDatas.medium}
          target="_blank"
          className="w-6 h-6"
        >
          <FaMediumM className="w-full h-full" color="#00000080" />
        </Link>
        <Link
          href={socialMediaDatas.github}
          target="_blank"
          className="w-6 h-6"
        >
          <FaGithub className="w-full h-full" color="#00000080" />
        </Link>
      </div>
    </div>
  );
};

export default ContactBox;
