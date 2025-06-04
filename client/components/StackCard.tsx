"use client";

import React, { useState } from "react";
import rightArrowSVG from "../public/svg/rightArrow.svg";
import Image from "next/image";
import { motion } from "framer-motion";

const StackCard = ({
  stackTitle,
  stackDescription,
  stackIcon,
}: {
  stackTitle: string;
  stackDescription: string;
  stackIcon: string;
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex  gap-2 md:gap-4 w-full h-full p-4 border-2 border-dashed border-gray-300 rounded-lg shadow-md transition-all duration-500 cursor-pointer hover:bg-[#E3E3E3] hover:border-[#C3C4C5] 
      "
    >
      <Image
        src={`http://localhost:4000${stackIcon}`}
        alt={stackTitle}
        width={64}
        height={64}
        className="w-16 h-16 p-2 object-cover rounded-full  "
      />
      {/* <img
        src={stackIcon}
        alt={stackTitle}
        className="w-16 h-16 mb-4 object-cover "
      /> */}
      <div className="text-left flex flex-col justify-center">
        <h3 className="text-20px text-[#313336]">{stackTitle}</h3>
        <p className="text-[14px] text-[#31333699]">{stackDescription}</p>
      </div>

      <div className=" justify-end items-center ml-auto hidden md:flex w-16 h-16 p-2">
        <motion.div
          animate={{ rotate: hovered ? 45 : 0 }}
          transition={{
            duration: 0.3,
          }}
        >
          <Image src={rightArrowSVG} alt="Right arrow" />
        </motion.div>
      </div>
    </div>
  );
};

export default StackCard;
