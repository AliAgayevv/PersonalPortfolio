import CtaButton from "@/components/CtaButton";
import Footer from "@/components/Footer";
import React, { Suspense } from "react";
import { cookies } from "next/headers";
import getPageData from "@/lib/getPageData";
import AllProjects from "@/components/AllProjects";
import LoadingAnimation from "@/components/animations/LoadingAnimation";
import Link from "next/link";

export default async function page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const pageData = await getPageData("projects", lang as "az" | "en");

  return (
    <div className=" w-full ">
      <h1 className="mt-24 font-[600] text-66px">{pageData.content.title}</h1>
      <p className="md:w-[25%] w-full h-full text-[#00000080] font-[500]">
        {pageData.content.description}
        <span className="text-black font-[600]">
          {pageData.content.highlightedText}
        </span>
      </p>
      <div className="mt-6">
        <Link href="/contact">
          <CtaButton innerText={pageData.content.buttonInner} mode="email" />
        </Link>
      </div>
      <Suspense fallback={<LoadingAnimation />}>
        <AllProjects />
      </Suspense>

      <div className=" absolute w-full left-0  h-full md:mt-0 mt-40">
        <Footer />
      </div>
    </div>
  );
}
