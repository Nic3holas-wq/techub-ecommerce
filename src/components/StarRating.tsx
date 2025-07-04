import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  const Star = ({ fill }: { fill: 'full' | 'half' | 'empty' }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {fill === 'full' && (
        <path
          className="text-yellow-500"
          fill="currentColor"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      )}
      {fill === 'half' && (
        <>
          <defs>
            <linearGradient id="halfGrad">
              <stop offset="50%" stopColor="#facc15" />
              <stop offset="50%" stopColor="transparent" />
            </linearGradient>
          </defs>
          <path
            fill="url(#halfGrad)"
            stroke="#facc15"
            strokeWidth="1"
            d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
          />
        </>
      )}
      {fill === 'empty' && (
        <path
          className="text-yellow-300"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
        />
      )}
    </svg>
  );

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star key={`full-${i}`} fill="full" />
      ))}
      {hasHalfStar && <Star key="half" fill="half" />}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star key={`empty-${i}`} fill="empty" />
      ))}
    </div>
  );
};

export default StarRating;
