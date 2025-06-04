"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { FaInstagram } from "react-icons/fa";
import { BsArrowUpRight } from "react-icons/bs";
import { TfiEmail } from "react-icons/tfi";
import Link from "next/link";
import Image from "next/image";

interface AnimatedEndSection {
  content: {
    sectionText: string;
    title: string;
    followButton: string;
    emailButton: string;
  };
  photos: string;
}

interface AnimatedEndSectionProps {
  data: AnimatedEndSection;
}

export default function AnimatedEndSection({ data }: AnimatedEndSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 60,
      rotateX: 10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 1,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="w-[90%] mx-auto text-white my-40 pb-0 md:pb-40 h-full relative"
    >
      <motion.div
        className="absolute inset-0 -z-10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <motion.div
          className="absolute top-10 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 8,
            repeat: 3,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-1/4 w-80 h-80 bg-gradient-to-r from-pink-500/5 to-orange-500/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 10,
            repeat: 3,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      <motion.h1
        variants={itemVariants}
        className="text-center font-bold end-text w-full uppercase relative"
      >
        <motion.span
          className="inline-block"
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 3,
            repeat: 3,
            ease: "easeInOut",
          }}
          style={{
            willChange: "background-position",
            background:
              "linear-gradient(90deg, currentColor 0%, rgba(255,255,255,0.7) 50%, currentColor 100%)",
            backgroundSize: "200% 100%",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
          }}
        >
          {data.content.sectionText}
        </motion.span>
      </motion.h1>

      <motion.div
        variants={cardVariants}
        className="w-full h-full mb-40 bg-[#f5f5f5] rounded-2xl flex justify-center items-center flex-col text-black gap-3 py-14 mt-4 relative overflow-hidden shadow-2xl"
        whileHover={{
          y: -5,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-[0.02]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 15,
            repeat: 3,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, #000 1px, transparent 1px),
              linear-gradient(180deg, #000 1px, transparent 1px)
            `,
            backgroundSize: "30px 30px",
          }}
        />

        <motion.div
          variants={imageVariants}
          className="size-28 bg-gray-200 rounded-full flex justify-center items-center border-black border-6 text-black relative z-10 overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              background: [
                "conic-gradient(from 0deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
                "conic-gradient(from 360deg, transparent, rgba(59, 130, 246, 0.1), transparent)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: 3,
              ease: "linear",
            }}
          />
          <motion.div
            animate={{
              y: [-2, 2, -2],
            }}
            transition={{
              duration: 4,
              repeat: 3,
              ease: "easeInOut",
            }}
            className="size-28 bg-gray-200 rounded-full flex justify-center items-center   text-black  z-10"
          >
            <Image
              width={200}
              height={200}
              src={`http://localhost:4000${data.photos}`}
              alt="End Section Image"
              className="w-full h-full object-cover rounded-full"
              loading="lazy"
            />
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center w-full">
          <motion.h2
            className="text-40px font-bold"
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 2,
              repeat: 3,
              ease: "easeInOut",
            }}
          >
            {data.content.title}
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-[#00000080] text-20px text-center w-full md:w-[50%] mx-auto mt-2 mb-5 px-4"
            style={{
              wordBreak: "break-all",
            }}
          >
            loremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremloremlorem
            loremloremloremlorem
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="flex justify-center items-center flex-col md:flex-row gap-4 pb-4"
        >
          <motion.div variants={buttonVariants}>
            <Link
              href="https://www.instagram.com/ali.agayevh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                className="rounded-2xl bg-black text-white p-4 flex justify-center items-center gap-1 shadow-2xl shadow-black/30 relative overflow-hidden"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10 flex items-center gap-1">
                  {data.content.followButton}
                  <FaInstagram />
                  <motion.p
                    className="ml-1"
                    animate={{ rotate: [0, 15, 0] }}
                    transition={{
                      duration: 2,
                      repeat: 3,
                    }}
                  >
                    <BsArrowUpRight size={14} />
                  </motion.p>
                </span>
              </motion.button>
            </Link>
          </motion.div>

          <motion.div variants={buttonVariants}>
            <motion.button
              className="w-60 rounded-2xl text-black bg-white flex justify-center items-center gap-1 border p-4 border-gray-300 shadow-2xl shadow-black/30 relative overflow-hidden"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.3)",
                backgroundColor: "#f8f9fa",
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative z-10 flex items-center gap-1">
                {data.content.emailButton}
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: 3,
                    delay: 0.5,
                  }}
                >
                  <TfiEmail size={14} className="ml-1" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
