"use client";
import React from "react";
import { useForm } from "react-hook-form";
import loginData from "@/data/LoginData";
const ContactInput = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)();
  };

  return (
    <div className="w-full">
      <div className="space-y-6">
        {loginData.map((field) => (
          <div key={field.id} className="space-y-2">
            {field.name === "message" ? (
              <textarea
                id={field.name}
                rows={4}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${
                  touchedFields[field.name] && !errors[field.name]
                    ? "bg-gray-100 border-gray-400"
                    : "bg-gray-100 border-gray-300"
                } ${errors[field.name] ? "border-red-500" : ""}`}
                placeholder={field.placeHolder}
                {...register(field.name, {
                  required: field.required,
                  pattern: field.pattern,
                })}
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors ${
                  touchedFields[field.name] && !errors[field.name]
                    ? "bg-gray-100 border-gray-400"
                    : "bg-gray-100 border-gray-300"
                } ${errors[field.name] ? "border-red-500" : ""}`}
                placeholder={field.placeHolder}
                {...register(field.name, {
                  required: field.required,
                  pattern: field.pattern,
                })}
              />
            )}
            {errors[field.name] && (
              <span className="text-red-500 text-sm">
                {errors[field.name].message || field.required}
              </span>
            )}
          </div>
        ))}

        <button
          onClick={handleFormSubmit}
          className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors font-medium"
        >
          Submit
        </button>
      </div>
    </div>
  );
};
export default ContactInput;
