import { Skeleton } from "@/components/ui/skeleton";

const PageSkeleton = () => (
  <div className="min-h-screen bg-[#F8F9FC] p-6 lg:p-8 font-sans text-slate-800">
    <div className="flex justify-between items-center mb-6">
      <Skeleton className="h-8 w-48" />
      <div className="flex gap-3">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
    </div>

    {/* Stats Grid Skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full rounded-2xl" />
      ))}
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div className="lg:col-span-2 space-y-6">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
      <div className="lg:col-span-1">
        <Skeleton className="h-64 w-full rounded-2xl" />
      </div>
    </div>

    {/* Table Skeleton */}
    <div className="bg-white p-6 rounded-2xl border border-gray-200">
      <div className="flex justify-between mb-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-64" />
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PageSkeleton;
