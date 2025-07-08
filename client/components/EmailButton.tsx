"use client";
import { useState } from "react";
import { TfiEmail } from "react-icons/tfi";

const EmailButton = ({
  gmail,
  innerText,
  lang,
}: {
  gmail: string;
  innerText: string;
  lang: "az" | "en";
}) => {
  const [copied, setCopied] = useState(false);

  const copyEmailToClipboard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      await navigator.clipboard.writeText(gmail);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Email kopyalanmadı:", err);
      const textArea = document.createElement("textarea");
      textArea.value = gmail;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={copyEmailToClipboard}
      className="w-60 rounded-2xl text-black bg-white flex justify-center items-center gap-1 border p-4 border-gray-300 shadow-2xl shadow-black/30 hover:shadow-black/50 transition-all duration-300 cursor-pointer"
    >
      {copied ? (
        <>
          <span className="text-green-600">
            {lang === "az" ? "E-poçt Kopyalandı" : "Email Copied"}
          </span>
          <svg
            className="w-4 h-4 text-green-600 ml-1"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </>
      ) : (
        <>
          <span>{innerText || "E-poçtu Kopyala"}</span>
          <TfiEmail size={14} className="ml-1" />
        </>
      )}
    </button>
  );
};

export default EmailButton;
