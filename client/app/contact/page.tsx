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
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  try {
    const ogTitle = "Əlaqə";

    return {
      title: "Əlaqə",
      description:
        "Ali Ağayev ilə əlaqə saxlayın. Bakıda fəaliyyət göstərən freelance frontend developer. Next.js, React və TypeScript layihələri üçün professional veb development xidmətləri.",
      keywords: [
        "Ali Ağayev əlaqə",
        "frontend developer əlaqə bakı",
        "freelance developer azərbaycan",
        "next.js developer əlaqə",
        "react developer bakı",
        "typescript developer əlaqə",
        "veb development xidmətləri",
        "freelance veb developer",
        "baku web developer contact",
        "azerbaijan software developer",
      ],
      openGraph: {
        title: "Əlaqə - Ali Ağayev | Frontend Developer",
        description:
          "Ali Ağayev ilə əlaqə saxlayın. Professional frontend development və freelance veb xidmətləri üçün birgə işləyək.",
        url: "https://aghayev.dev/contact",
        siteName: "Ali Aghayev Portfolio",
        locale: "az_AZ",
        type: "website",
        images: [
          {
            url: `https://aghayev.dev/api/og?title=${encodeURIComponent(
              ogTitle
            )}`,
            alt: "Ali Ağayev ilə Əlaqə - Frontend Developer",
            width: 1200,
            height: 630,
            type: "image/png",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Əlaqə - Ali Ağayev | Frontend Developer",
        description:
          "Ali Ağayev ilə əlaqə saxlayın. Professional frontend development və freelance veb xidmətləri.",
        images: [
          `https://aghayev.dev/api/og?title=${encodeURIComponent(ogTitle)}`,
        ],
        creator: "@aliaghayev",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: "https://aghayev.dev/contact",
        languages: {
          "az-AZ": "https://aghayev.dev/contact",
          "en-US": "https://aghayev.dev/en/contact",
        },
      },
    };
  } catch (error) {
    console.error("Əlaqə metadata yaratma xətası:", error);

    return {
      title: "Əlaqə",
      description:
        "Ali Ağayev ilə əlaqə saxlayın. Frontend developer və freelancer.",
      openGraph: {
        title: "Əlaqə - Ali Ağayev",
        description: "Ali Ağayev ilə əlaqə saxlayın.",
        images: [
          {
            url: `https://aghayev.dev/api/og?title=${encodeURIComponent(
              "Əlaqə"
            )}`,
            alt: "Əlaqə",
            width: 1200,
            height: 630,
          },
        ],
      },
    };
  }
}

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
      <div className="absolute left-0 w-full md:mt-96 pt-20">
        <Footer />
      </div>
    </section>
  );
}
