"use client";

import React, { useState } from "react";
import rightArrowSVG from "../public/svg/rightArrow.svg";
import Image from "next/image";
import { motion } from "framer-motion";

interface StackCardProps {
  stackTitle: string;
  stackDescription: string;
  stackIcon: string;
}

const StackCard: React.FC<StackCardProps> = ({
  stackTitle,
  stackDescription,
  stackIcon,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center gap-2 md:gap-4 w-full p-3 md:p-4 border-2 border-dashed border-gray-300 rounded-lg shadow-md transition-all duration-500 cursor-pointer hover:bg-[#E3E3E3] hover:border-[#C3C4C5]"
    >
      <div className="flex-shrink-0 w-12 h-12 md:w-16 md:h-16 flex items-center justify-center">
        <Image
          src={`http://localhost:5000${stackIcon}`}
          alt={stackTitle}
          width={64}
          height={64}
          className="w-full h-full p-1 md:p-2 object-contain rounded-full"
        />
      </div>

      <div className="text-left flex flex-col justify-center flex-grow min-w-0">
        <h3 className="text-[14px] sm:text-[16px] md:text-xl text-[#313336] font-semibold whitespace-normal leading-tight">
          {stackTitle}
        </h3>
        <p className="text-xs md:text-sm text-[#31333699] whitespace-normal leading-snug">
          {stackDescription}
        </p>
      </div>

      <div className=" hidden md:flex flex-shrink-0  justify-end items-center w-8 h-8 md:w-16 md:h-16">
        <motion.div
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{
            duration: 0.3,
          }}
          className="w-4 h-4 md:w-6 md:h-6 flex items-center justify-center"
        >
          <Image
            src={rightArrowSVG}
            alt="Right arrow"
            width={24}
            height={24}
            className="w-full h-full object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default StackCard;
