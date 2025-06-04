"use client";

import React from "react";

const ServicesCard = ({
  icon,
  title,
  description,
  list,
  photo,
}: {
  icon: string;
  title: string;
  description: string;
  list: string[];
  photo: string;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="flex flex-col border-b border-gray-700 py-4">
      <div
        className="flex items-center gap-4 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-12 h-12">
          <img src={icon} alt="icon" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-lg font-semibold">{title}</h2>
        <button className="ml-auto text-2xl">{isOpen ? "-" : "+"}</button>
      </div>

      {isOpen && (
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
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <button className="bg-white text-black px-4 py-2 mt-2 font-semibold w-fit">
              BOOK A CALL
            </button>
          </div>

          {/* Right: Image */}
          <div className="md:flex-1 w-1/2 h-40 md:w-full">
            <img
              src={photo}
              alt="photo"
              className="w-full h-full object-cover rounded-xl"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesCard;
