"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Link from "next/link";
import getUrl from "@/lib/getUrl";

export default function NavbarDropdown({ lang }: { lang: "az" | "en" }) {
  const navbarContent = {
    az: {
      about: "Haqqımda",
      projects: "Layihələr",
      contact: "Əlaqə",
      blog: "Bloq ",
      resume: "CV",
    },
    en: {
      about: "About",
      projects: "Projects",
      contact: "Contact",
      blog: "Blog ",
      resume: "Resume",
    },
  };
  const [isOpen, setIsOpen] = useState(false);
  const [cvUrl, setCvUrl] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsOpen(false));

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const reqUrl = getUrl();
        const res = await fetch(`${reqUrl}/api/cv`, {
          method: "GET",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch CV");
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        setCvUrl(url);
      } catch (error) {
        console.error("CV fetch error:", error);
      }
    };

    fetchCV();
  }, []);

  console.log("CV URL:", cvUrl);
  return (
    <div
      ref={ref}
      onClick={() => setIsOpen(!isOpen)}
      className="px-4 py-4 bg-black rounded-[10px] flex items-center justify-center cursor-pointer relative"
    >
      <motion.div
        animate={{ scale: isOpen ? 4 : 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-2 h-2 bg-white rounded-full"
      />
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="absolute top-12 right-1/2 translate-x-1/2 bg-black shadow-lg rounded-lg p-4"
        >
          <motion.ul
            className="flex flex-col gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <a href="/about" onClick={() => setIsOpen(false)}>
              <LiWithAnimation>{navbarContent[lang].about}</LiWithAnimation>
            </a>
            <Link href="/projects">
              <LiWithAnimation>{navbarContent[lang].projects}</LiWithAnimation>
            </Link>
            <Link href="/contact">
              <LiWithAnimation>{navbarContent[lang].contact}</LiWithAnimation>
            </Link>
            <Link href="/blog">
              <LiWithAnimation>{navbarContent[lang].blog}</LiWithAnimation>
            </Link>
            <a href={cvUrl as string} target="_blank" rel="noopener noreferrer">
              <LiWithAnimation>{navbarContent[lang].resume}</LiWithAnimation>
            </a>
          </motion.ul>
        </motion.div>
      )}
    </div>
  );
}

const LiWithAnimation = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.li
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
      className="text-white"
    >
      {children}
    </motion.li>
  );
};
