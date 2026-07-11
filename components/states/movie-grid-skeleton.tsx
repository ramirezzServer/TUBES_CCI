import { Skeleton } from "@/components/ui/skeleton";

interface MovieGridSkeletonProps {
  count?: number;
}

export function MovieGridSkeleton({ count = 10 }: MovieGridSkeletonProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/4" />
        </div>
      ))}
    </div>
  );
}
