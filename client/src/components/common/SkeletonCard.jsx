import React from 'react';

/**
 * Skeleton loading card component
 * Provides a better perceived performance by showing placeholder content
 * while data is being fetched from the API
 */
const SkeletonCard = () => {
  return (
    <div className="bg-glass backdrop-blur-sm border border-glass rounded-xl overflow-hidden animate-pulse">
      {/* Image Skeleton */}
      <div className="relative h-48 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer" />

      <div className="p-6 space-y-4">
        {/* Category Badge Skeleton */}
        <div className="w-20 h-5 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded-full" />

        {/* Title Skeleton */}
        <div className="space-y-2">
          <div className="h-6 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded w-3/4" />
          <div className="h-6 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded w-1/2" />
        </div>

        {/* Content Skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded" />
          <div className="h-4 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded w-5/6" />
          <div className="h-4 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded w-4/6" />
        </div>

        {/* Footer Skeleton */}
        <div className="flex items-center justify-between pt-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded-full" />
            <div className="space-y-2">
              <div className="h-3 w-24 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded" />
              <div className="h-3 w-16 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded" />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="h-4 w-12 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded" />
            <div className="h-4 w-12 bg-gradient-to-r from-gray-700/30 via-gray-600/30 to-gray-700/30 bg-[length:200%_100%] animate-shimmer rounded" />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Grid of skeleton cards
 * Shows multiple skeleton cards at once for better loading experience
 */
export const SkeletonCardGrid = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default SkeletonCard;
