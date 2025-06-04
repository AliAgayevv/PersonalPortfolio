"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ServicesCard = ({
  title,
  description,
  list,
}: {
  title: string;
  description: string;
  list: string[];
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col border-b border-gray-700 py-4">
      <div
        className="flex items-center gap-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 className="text-lg font-semibold">{title}</h2>
        <motion.button
          className="ml-auto text-2xl"
          animate={{
            opacity: isOpen ? 1 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? "-" : "+"}
        </motion.button>
      </div>

      {/* Animated Content */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="flex flex-col md:flex-row mt-4 gap-6">
              {/* Left: Text content */}
              <div className="flex-1 space-y-4">
                <p className="text-gray-300">{description}</p>

                <div>
                  <h4 className="text-white font-semibold mb-2">
                    [ KEY FEATURES ]
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-200">
                    {list.map((item, index) => (
                      <li key={index}>{item.name}</li>
                    ))}
                  </ul>
                </div>

                <button className="bg-white text-black px-4 py-2 mt-2 font-semibold w-fit">
                  BOOK A CALL
                </button>
              </div>

              {/* Right: Image */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ServicesCard;
