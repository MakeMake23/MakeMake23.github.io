"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  onRatingChange: (rating: number) => void;
}

const StarRating = ({ onRatingChange }: StarRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  const handleClick = (ratingValue: number) => {
    setRating(ratingValue);
    onRatingChange(ratingValue);
  };

  return (
    <div className="flex justify-center">
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => handleClick(ratingValue)}
              className="hidden"
            />
            <FaStar
              className="cursor-pointer transition-colors duration-200"
              color={
                ratingValue <= (hover || rating || 0) ? "#ffc107" : "#e4e5e9"
              }
              size={40}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
