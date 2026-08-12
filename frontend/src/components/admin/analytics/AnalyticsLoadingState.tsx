import React from "react";

interface AnalyticsLoadingStateProps {
  rows?: number;
  message?: string;
}

export const AnalyticsLoadingState: React.FC<AnalyticsLoadingStateProps> = ({
  rows = 6,
  message = "Loading dashboard...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full p-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-burgundy mb-4"></div>
      <p className="text-gray-500 text-sm font-medium animate-pulse">{message}</p>

      {/* Skeleton grid */}
      <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="h-32 bg-gray-100/50 rounded-lg animate-pulse border border-gray-100 w-full"></div>
        ))}
      </div>
    </div>
  );
};
