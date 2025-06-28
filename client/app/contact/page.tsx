import getPageData from "@/lib/getPageData";
import { cookies } from "next/headers";
import Link from "next/link";
import { BsArrowUpRight } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import socialMediaDatas from "@/data/socialMedia.json";
import ContactForm from "@/components/ContactForm";
import ContactBox from "@/components/ContactBox";
import Footer from "@/components/Footer";
import EmailButton from "@/components/EmailButton";

export default async function Page() {
  const cookieStore = await cookies();
  const lang = cookieStore.get("lang")?.value || "az";
  const pageData = await getPageData("contact", lang as "az" | "en");

  return (
    <section
      lang={lang}
      data-testid="contact-section"
      aria-label="Contact Section"
      aria-labelledby="contact-heading"
      role="region"
      className="pb-40"
    >
      <h1 className="header-text font-bold mt-10 md:mt-28">
        {pageData.content.title}
      </h1>
      <p className="text-[#00000080] w-full md:w-1/2 text-24px">
        {pageData.content.description}
      </p>
      <div className="flex flex-row items-stretch mt-8 gap-2 sm:gap-4 w-full max-w-full md:max-w-[600px]">
        <Link
          className="flex-1"
          href={socialMediaDatas.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          <button className="w-full h-full min-h-[60px] rounded-2xl bg-black text-white p-2 sm:p-4 flex justify-center items-center gap-1 sm:gap-2 shadow-2xl shadow-black/30 hover:shadow-black/70 transition-all duration-300">
            <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
              {pageData.content.followButton}
            </span>
            <FaLinkedin className="flex-shrink-0" />
            <BsArrowUpRight size={14} className="flex-shrink-0" />
          </button>
        </Link>

        {/* <a
          href={`mailto:${socialMediaDatas.gmail}`}
          className="flex-1 h-full min-h-[60px] rounded-2xl text-black bg-white flex justify-center items-center gap-1 sm:gap-2 border p-2 sm:p-4 border-gray-300 shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all duration-300"
        >
          <span className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap">
            {pageData.content.email}
          </span>
          <TfiEmail size={14} className="flex-shrink-0" />
        </a> */}
        <EmailButton
          innerText={pageData.content.email}
          gmail={socialMediaDatas.gmail}
          lang={lang as "az" | "en"}
        />
      </div>
      <section
        className="flex md:justify-between md:items-center w-full gap-10 flex-col md:flex-row h-full"
        aria-label="Contact Form Section"
        aria-labelledby="contact-form-heading"
        role="region"
      >
        <ContactForm />
        <ContactBox
          title={pageData.content.alsoInSocial}
          description={pageData.content.alsoInSocailDesc}
        />
      </section>
      <div className=" absolute left-0 w-full md:mt-96 pt-20">
        <Footer />
      </div>
    </section>
  );
}
