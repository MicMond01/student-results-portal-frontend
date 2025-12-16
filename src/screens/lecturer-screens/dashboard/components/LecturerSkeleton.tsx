import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSkeleton = () => (
  <div className="min-h-screen bg-[#F8F9FC] p-6 lg:p-8 font-sans text-slate-800">
    {/* Header Skeleton */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div className="space-y-3">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-56" />
      </div>
      <Skeleton className="h-10 w-40" />
    </div>

    {/* Stats Cards Skeleton */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-5 flex flex-col justify-between h-36">
          <div className="flex justify-between items-start">
            <Skeleton className="h-12 w-12 rounded-xl" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-32" />
          </div>
        </Card>
      ))}
    </div>

    {/* Charts Section Skeleton */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <Card className="lg:col-span-2 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
        <div className="flex items-end justify-between h-56 gap-4 px-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton
              key={i}
              className="w-12 rounded-t-lg"
              style={{ height: `${Math.random() * 60 + 20}%` }}
            />
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center pb-6 border-b border-gray-50 last:border-0"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-3 w-16" />
              </div>
              <div className="space-y-2 flex flex-col items-end">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-3 w-8" />
              </div>
            </div>
          ))}
        </div>
        <Skeleton className="h-10 w-full mt-6" />
      </Card>
    </div>

    {/* Table Skeleton */}
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-10 w-64" />
      </div>
      <Card className="overflow-hidden">
        <div className="border-b border-gray-100 p-4">
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Skeleton key={i} className="h-4 w-24" />
            ))}
          </div>
        </div>
        <div className="p-0">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex justify-between p-4 border-b border-gray-50"
            >
              <div className="space-y-2">
                <Skeleton className="h-5 w-16" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-3 w-32" />
              </div>
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-5 w-32" />
              <Skeleton className="h-5 w-12" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  </div>
);

export default DashboardSkeleton;
