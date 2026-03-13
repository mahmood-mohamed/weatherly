// import { Skeleton } from "@/components/ui/skeleton";

import { Skeleton } from "../ui/skeleton";


export function WeatherSkeletonLoader() {
  return (
    <div className="flex flex-col space-y-8 w-full max-w-7xl mx-auto p-4 animate-pulse">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Current Weather Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Skeleton className="h-[400px] w-full rounded-2xl" />
          
          {/* Hourly Forecast Row Skeleton */}
          <div className="flex space-x-4 overflow-hidden">
             {[...Array(10)].map((_, i) => (
               <Skeleton key={i} className="h-32 w-24 rounded-xl flex-shrink-0" />
             ))}
          </div>
        </div>

        {/* Right Column: 3 Day Forecast Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-8 w-48 mb-4" />
          {[...Array(3)].map((_, i) => (
             <Skeleton key={i} className="h-16 w-full rounded-xl" />
          ))}
        </div>
      </div>
      
      {/* Bottom Grid: Weather Condition Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
         {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
         ))}
      </div>
    </div>
  );
}
