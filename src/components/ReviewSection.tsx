"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import StarRating from "./StarRating";

interface ReviewSectionProps {
  reviewTitle: string;
  buttonText: string;
}

const ReviewSection = ({ reviewTitle, buttonText }: ReviewSectionProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const router = useRouter();

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleRedirect = () => {
    if (rating) {
      router.push(`/review/${rating}`);
    }
  };

  return (
    <section id="review" className="relative">
      <div className="py-8 px-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-8 text-center">
          {reviewTitle}
        </h2>
        <StarRating onRatingChange={handleRatingChange} />
        {rating && (
          <div className="text-center mt-4">
            <button
              onClick={handleRedirect}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
