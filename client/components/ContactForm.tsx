// First install: npm install formik yup

"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";
// import getUrl from "@/lib/getUrl";

// Translations object
const translations = {
  az: {
    namePlaceholder: "Ad",
    emailPlaceholder: "Email",
    phonePlaceholder: "Telefon (məs., +994705755245)",
    messagePlaceholder: "Mesaj",
    submitButton: "Göndər",
    submitting: "Göndərilir...",

    submitSuccess: "Təşəkkür edirik! Mesajınız uğurla göndərildi.",
    submitError: "Forma göndərilmədi. Zəhmət olmasa yenidən cəhd edin.",

    nameRequired: "Ad tələb olunur",
    nameMin: "Ad ən azı 2 simvoldan ibarət olmalıdır",
    nameMax: "Ad 50 simvoldan az olmalıdır",

    emailRequired: "Email tələb olunur",
    emailInvalid: "Düzgün email ünvanı daxil edin",

    phoneRequired: "Telefon nömrəsi tələb olunur",
    phoneStart: "Telefon nömrəsi '+' ilə başlamalıdır",
    phoneMin: "Telefon nömrəsi ən azı 8 simvoldan ibarət olmalıdır",
    phoneMax: "Telefon nömrəsi 20 simvoldan az olmalıdır",

    messageRequired: "Mesaj tələb olunur",
    messageMin: "Mesaj ən azı 10 simvoldan ibarət olmalıdır",
    messageMax: "Mesaj 1000 simvoldan az olmalıdır",
  },
  en: {
    namePlaceholder: "Name",
    emailPlaceholder: "Email",
    phonePlaceholder: "Phone (e.g., +994705755245)",
    messagePlaceholder: "Message",
    submitButton: "Submit",
    submitting: "Submitting...",

    submitSuccess: "Thank you! Your message has been sent successfully.",
    submitError: "Failed to submit form. Please try again.",

    nameRequired: "Name is required",
    nameMin: "Name must be at least 2 characters long",
    nameMax: "Name must be less than 50 characters",

    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",

    phoneRequired: "Phone number is required",
    phoneStart: "Phone number must start with '+'",
    phoneMin: "Phone number must be at least 8 characters long",
    phoneMax: "Phone number must be less than 20 characters",

    messageRequired: "Message is required",
    messageMin: "Message must be at least 10 characters long",
    messageMax: "Message must be less than 1000 characters",
  },
};

interface FormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const initialValues: FormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function ContactForm() {
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<"az" | "en">("az");

  useEffect(() => {
    const lang = (getCookie("lang") as "az" | "en") || "az";
    setCurrentLang(lang);
  }, []);

  const t = translations[currentLang];

  // Create validation schema based on current language
  const getValidationSchema = (lang: "az" | "en") => {
    const t = translations[lang];

    return Yup.object().shape({
      name: Yup.string()
        .trim()
        .min(2, t.nameMin)
        .max(50, t.nameMax)
        .required(t.nameRequired),

      email: Yup.string()
        .trim()
        .email(t.emailInvalid)
        .required(t.emailRequired),

      phone: Yup.string()
        .trim()
        .matches(/^\+/, t.phoneStart)
        .min(8, t.phoneMin)
        .max(20, t.phoneMax)
        .required(t.phoneRequired),

      message: Yup.string()
        .trim()
        .min(10, t.messageMin)
        .max(1000, t.messageMax)
        .required(t.messageRequired),
    });
  };

  const handleSubmit = async (
    values: FormValues,
    {
      setSubmitting,
      resetForm,
    }: {
      setSubmitting: (isSubmitting: boolean) => void;
      resetForm: () => void;
    }
  ) => {
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const sanitizedData = {
        name: values.name.trim(),
        email: values.email.trim().toLowerCase(),
        message: values.message.trim(),
        phoneNumber: values.phone.trim(),
      };

      // TODO: Replace with your actual API URL
      const response = await fetch(`https://aghayev.dev/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sanitizedData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }
      setSubmitSuccess(true);
      resetForm();

      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitError(t.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full md:w-2/3 pt-10 rounded-lg">
      {submitSuccess && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
          {t.submitSuccess}
        </div>
      )}

      {submitError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {submitError}
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(currentLang)}
        onSubmit={handleSubmit}
        validateOnBlur={true}
        validateOnChange={false}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4">
            <div>
              <Field
                type="text"
                name="name"
                placeholder={t.namePlaceholder}
                className={`w-full px-4 py-4 bg-[#F5F5F5] border-none rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.name && touched.name
                    ? "focus:ring-red-500 ring-2 ring-red-500"
                    : "focus:ring-black"
                }`}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <Field
                type="email"
                name="email"
                placeholder={t.emailPlaceholder}
                className={`w-full px-4 py-4 bg-[#F5F5F5] border-none rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.email && touched.email
                    ? "focus:ring-red-500 ring-2 ring-red-500"
                    : "focus:ring-black"
                }`}
              />
              <ErrorMessage
                name="email"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <Field
                type="text"
                name="phone"
                placeholder={t.phonePlaceholder}
                className={`w-full px-4 py-4 bg-[#F5F5F5] border-none rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white transition-all ${
                  errors.phone && touched.phone
                    ? "focus:ring-red-500 ring-2 ring-red-500"
                    : "focus:ring-black"
                }`}
              />
              <ErrorMessage
                name="phone"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="message"
                placeholder={t.messagePlaceholder}
                rows={4}
                className={`w-full px-4 py-4 bg-[#F5F5F5] border-none rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:bg-white transition-all resize-none ${
                  errors.message && touched.message
                    ? "focus:ring-red-500 ring-2 ring-red-500"
                    : "focus:ring-black"
                }`}
              />
              <ErrorMessage
                name="message"
                component="p"
                className="mt-1 text-sm text-red-600"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full h-full rounded-2xl text-white p-4 flex justify-center items-center gap-1 shadow-2xl transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-black shadow-black/30 hover:shadow-black/70 hover:cursor-pointer"
              }`}
            >
              {isSubmitting ? t.submitting : t.submitButton}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
