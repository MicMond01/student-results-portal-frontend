import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const CourseDetailsSkeleton = () => (
  <div className="min-h-screen bg-gray-50/50 p-6 lg:p-8 font-sans text-slate-800">
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex justify-between items-start">
        <div className="space-y-3">
          <Skeleton className="h-4 w-32" />
          <div className="flex gap-3 items-center">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Description Skeleton */}
          <Card className="p-6 space-y-4">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-20 w-full" />
          </Card>

          {/* Key Details Skeleton */}
          <Card className="p-6">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="grid grid-cols-2 gap-y-6 gap-x-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <Card className="p-6 space-y-6">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-4">
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
              <div className="flex justify-between">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            </div>
            <Skeleton className="h-px w-full" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default CourseDetailsSkeleton;
