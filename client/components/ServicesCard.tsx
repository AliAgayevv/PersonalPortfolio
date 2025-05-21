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
    <div className="flex flex-col">
      <div
        className="gap-4 items-center flex w-full hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center w-12 h-12 justify-center ">
          <img src={icon} alt="icon" className="w-full h-full  " />
        </div>
        <h2>{title}</h2>
        <button className="ml-auto">
          {
            isOpen ? <p>+</p> : <p>-</p>
            //     <img
            //       src="/assets/icons/arrow-up.svg"
            //       alt="arrow-up"
            //       className="w-4 h-4"
            //     />
            //   ) : (
            //     <img
            //       src="/assets/icons/arrow-down.svg"
            //       alt="arrow-down"
            //       className="w-4 h-4"
            //     />
          }
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col pl-16">
          <div className="flex justify-between gap-4 mt-4  ">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4">
                <p>{description}</p>
                <ul className="list-disc pl-4">
                  {list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="flex w-1/2 h-full bg-blue-500  justify-end items-center">
                <img
                  src={photo}
                  alt="photo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
          <button className="mr-auto mt-5">Hey</button>
        </div>
      )}
    </div>
  );
};

export default ServicesCard;
