import { Skeleton } from "@/components/ui/skeleton";

export function MovieDetailSkeleton() {
  return (
    <div className="flex flex-col">
      <Skeleton className="h-64 w-full rounded-none sm:h-80 md:h-104 lg:h-120" />
      <div className="mx-auto w-full max-w-screen-2xl px-4 py-10 md:px-8 md:py-14 lg:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:gap-12">
          <Skeleton className="mx-auto aspect-2/3 w-48 shrink-0 rounded-lg sm:w-56 md:mx-0" />
          <div className="flex flex-1 flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-9 w-2/3" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
              <Skeleton className="h-6 w-20 rounded-md" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
