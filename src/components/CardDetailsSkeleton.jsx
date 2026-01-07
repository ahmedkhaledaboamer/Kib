import React from 'react';

function CardDetailsSkeleton() {
  return (
    <div className="relative w-full max-w-3xl rounded-[28px] overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.08)] animate-pulse">

      {/* IMAGE SKELETON */}
      <div className="relative h-[340px] bg-gray-200" />

      {/* CONTENT */}
      <div className="p-8 space-y-4">
        {/* Title */}
        <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
          <div className="h-4 w-4/6 bg-gray-200 rounded" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <div className="flex-1 h-12 bg-gray-200 rounded-xl" />
          <div className="flex-1 h-12 bg-gray-300 rounded-xl" />
        </div>
      </div>
    </div>
  );
}

export default CardDetailsSkeleton;
