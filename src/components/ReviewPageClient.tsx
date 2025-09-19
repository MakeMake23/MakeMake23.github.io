"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useReview } from "@/context/ReviewContext";
import {
  FaStar,
  FaLinkedin,
  FaEnvelope,
  FaTelegramPlane,
  FaPhone,
} from "react-icons/fa";
import AnimatedComponent from "./AnimatedComponent";

interface ReviewPageClientProps {
  initialRating: number;
  dict: any;
}

const ReviewPageClient = ({ initialRating, dict }: ReviewPageClientProps) => {
  const {
    fullName,
    setFullName,
    contactMethod,
    setContactMethod,
    contactInfo,
    setContactInfo,
    experience,
    setExperience,
  } = useReview();

  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState<number | null>(null);
  const [contactInfoError, setContactInfoError] = useState<string | null>(null);
  const [hasConsented, setHasConsented] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const pathSegments = pathname.split("/");
    const currentRating = parseInt(pathSegments[pathSegments.length - 1], 10);
    if (rating !== currentRating) {
      const newPath = pathSegments.slice(0, -1).join("/") + `/${rating}`;
      router.replace(newPath, { scroll: false });
    }
  }, [rating, pathname, router]);

  const validateContactInfo = useCallback(
    (value: string) => {
      if (!value) {
        setContactInfoError(null);
        return;
      }

      let error: string | null = null;
      switch (contactMethod) {
        case "email":
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            error = dict.review_page.form.errors.invalid_email;
          }
          break;
        case "linkedin":
          if (
            !/^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/.test(
              value
            )
          ) {
            error = dict.review_page.form.errors.invalid_linkedin;
          }
          break;
        case "telegram":
          if (!/^@[a-zA-Z0-9_]{5,32}$/.test(value)) {
            error = dict.review_page.form.errors.invalid_telegram;
          }
          break;
        case "phone":
          if (!/^\+?[1-9]\d{1,14}$/.test(value)) {
            error = dict.review_page.form.errors.invalid_phone;
          }
          break;
        default:
          break;
      }
      setContactInfoError(error);
    },
    [contactMethod, dict]
  );

  useEffect(() => {
    validateContactInfo(contactInfo);
  }, [contactInfo, contactMethod, validateContactInfo]);

  useEffect(() => {
    const interval = setInterval(() => {
      const turnstile = (window as any).turnstile;
      if (turnstile) {
        turnstile.render("#turnstile-container", {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!,
          callback: (token: string) => {
            setTurnstileToken(token);
          },
        });
        clearInterval(interval);
      }
    }, 300);

    return () => clearInterval(interval);
  }, []);

  const handleRatingClick = (ratingValue: number) => {
    setRating(ratingValue);
  };

  const contactOptions = [
    {
      value: "linkedin",
      label: dict.review_page.form.linkedin,
      icon: <FaLinkedin />,
      placeholder: "https://linkedin.com/in/username",
    },
    {
      value: "email",
      label: dict.review_page.form.email,
      icon: <FaEnvelope />,
      placeholder: "name@example.com",
    },
    {
      value: "telegram",
      label: dict.review_page.form.telegram,
      icon: <FaTelegramPlane />,
      placeholder: "@username",
    },
    {
      value: "phone",
      label: dict.review_page.form.phone,
      icon: <FaPhone />,
      placeholder: "+1234567890",
    },
  ];

  const isFormValid =
    fullName &&
    contactInfo &&
    !contactInfoError &&
    hasConsented &&
    turnstileToken;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    const reviewData = {
      stars: rating,
      fullName,
      contactMethod,
      contactInfo,
      description: experience,
      turnstileToken,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL!}/api/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reviewData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json<{ message: string }>();
        throw new Error(errorData.message || "Something went wrong");
      }

      setSubmitSuccess(true);
    } catch (error) {
      if (error instanceof Error) {
        setSubmitError(error.message);
      } else {
        setSubmitError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatedComponent>
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-2xl w-full">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4 text-center">
          {dict.review_page.form.title}
        </h1>
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, i) => {
            const ratingValue = i + 1;
            return (
              <label key={i}>
                <input
                  type="radio"
                  name="rating"
                  value={ratingValue}
                  onClick={() => handleRatingClick(ratingValue)}
                  className="hidden"
                />
                <FaStar
                  className="cursor-pointer transition-colors duration-200"
                  color={
                    ratingValue <= (hover || rating || 0)
                      ? "#ffc107"
                      : "#e4e5e9"
                  }
                  size={60}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              {dict.review_page.form.full_name}
            </label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => {
                if (e.target.value.length <= 255) {
                  setFullName(e.target.value);
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              maxLength={255}
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
              {fullName.length} / 255
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="contactMethod"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              {dict.review_page.form.contact_method}
            </label>
            <div className="grid grid-cols-2 gap-4">
              {contactOptions.map((option) => (
                <label
                  key={option.value}
                  className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-all ${
                    contactMethod === option.value
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                      : "border-gray-300 dark:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="contactMethod"
                    value={option.value}
                    checked={contactMethod === option.value}
                    onChange={() => setContactMethod(option.value)}
                    className="hidden"
                  />
                  <div className="mr-3 text-xl text-gray-600 dark:text-gray-300">
                    {option.icon}
                  </div>
                  <span className="text-gray-800 dark:text-gray-200">
                    {option.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <label
              htmlFor="contactInfo"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              {dict.review_page.form.contact_info}
            </label>
            <input
              type="text"
              id="contactInfo"
              placeholder={
                contactOptions.find((opt) => opt.value === contactMethod)
                  ?.placeholder
              }
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                contactInfoError
                  ? "border-red-500"
                  : "border-gray-300 dark:border-gray-600"
              }`}
            />
            {contactInfoError && (
              <p className="text-red-500 text-xs italic mt-2">
                {contactInfoError}
              </p>
            )}
          </div>
          <div className="mb-6">
            <label
              htmlFor="experience"
              className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
            >
              {dict.review_page.form.experience_label}
            </label>
            <textarea
              id="experience"
              value={experience}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setExperience(e.target.value);
                }
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 dark:bg-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows={4}
              placeholder={dict.review_page.form.experience_placeholder}
              maxLength={500}
            />
            <div className="text-right text-sm text-gray-500 dark:text-gray-400 mt-1">
              {experience.length} / 500
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="consent" className="flex items-start">
              <input
                type="checkbox"
                id="consent"
                checked={hasConsented}
                onChange={(e) => setHasConsented(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-600 dark:text-gray-400">
                {dict.review_page.form.consent_checkbox_link_text}{" "}
                <Link href="/privacy" className="text-blue-500 hover:underline">
                  {dict.footer.privacy_policy}
                </Link>{" "}
                {dict.review_page.form.consent_checkbox}
              </span>
            </label>
          </div>
          <div id="turnstile-container" className="mb-6"></div>
          {submitSuccess && (
            <div className="mb-4 text-center text-green-600 bg-green-100 dark:bg-green-900/30 dark:text-green-400 p-3 rounded-lg">
              {dict.review_page.form.success_message}
            </div>
          )}
          {submitError && (
            <div className="mb-4 text-center text-red-600 bg-red-100 dark:bg-red-900/30 dark:text-red-400 p-3 rounded-lg">
              {submitError}
            </div>
          )}
          <div className="flex items-center justify-center mt-6">
            {submitSuccess ? (
              <button
                type="button"
                onClick={() => router.push("/")}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                {dict.review_page.go_back_home}
              </button>
            ) : (
              <button
                type="submit"
                disabled={!isFormValid || isLoading}
                className="bg-blue-500 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition-all duration-300 transform hover:scale-105"
              >
                {isLoading
                  ? dict.review_page.form.submitting_button
                  : dict.review_page.form.submit_button}
              </button>
            )}
          </div>
        </form>
      </div>
    </AnimatedComponent>
  );
};

export default ReviewPageClient;
