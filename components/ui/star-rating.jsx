import React from 'react';
import { Star } from "lucide-react";

export const StarRating = ({ value, onChange, readOnly = false }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex gap-1">
      {stars.map((star) => (
        <Star
          key={star}
          className={`w-5 h-5 cursor-pointer ${
            star <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
          onClick={() => !readOnly && onChange(star)}
          onMouseEnter={(e) => {
            if (!readOnly) {
              e.currentTarget.classList.add('text-yellow-400');
            }
          }}
          onMouseLeave={(e) => {
            if (!readOnly && star > value) {
              e.currentTarget.classList.remove('text-yellow-400');
            }
          }}
        />
      ))}
    </div>
  );
}; 