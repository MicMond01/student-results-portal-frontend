import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const LecturerProfileSkeleton = () => {
  return (
    <div className="min-h-screen p-4 lg:p-8 animate-pulse">
      <div className="mx-auto  max-w-380 space-y-6">
        {/* Header Skeleton */}
        <Card className="overflow-hidden border-none shadow-md">
          <div className="h-32 bg-gray-300"></div>
          <div className="px-6 pb-6">
            <div className="relative flex flex-col items-center sm:flex-row sm:items-end -mt-12 mb-6 gap-4">
              <Skeleton className="h-32 w-32 rounded-full border-4 border-white" />
              <div className="flex-1 text-center sm:text-left space-y-3 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <Skeleton className="h-8 w-48" />
                  <Skeleton className="h-6 w-20 rounded-full" />
                </div>
                <Skeleton className="h-5 w-32" />
                <div className="flex justify-center sm:justify-start gap-4">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </div>
              <div className="flex gap-2 mt-4 sm:mt-0">
                <Skeleton className="h-10 w-28 rounded-md" />
                <Skeleton className="h-10 w-32 rounded-md" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t pt-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Statistics Skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                  </div>
                  <Skeleton className="h-12 w-12 rounded-full" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Skeleton */}
            <div className="flex gap-2 mb-6">
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
              <Skeleton className="h-10 w-32 rounded-md" />
            </div>
            {/* Course Cards Skeleton */}
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-5 space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <div className="space-y-1 text-right">
                        <Skeleton className="h-8 w-16 ml-auto" />
                        <Skeleton className="h-3 w-12 ml-auto" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 pt-4 border-t mt-4">
                      <div className="flex flex-col items-center gap-1">
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                      <div className="flex flex-col items-center gap-1 border-x border-gray-100">
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Skeleton className="h-6 w-8" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar Skeleton */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-3 w-full rounded-full" />
                    <Skeleton className="h-4 w-12" />
                  </div>
                ))}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between py-2 border-b last:border-0"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </div>
                ))}
                <Skeleton className="h-9 w-full rounded-md mt-4" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LecturerProfileSkeleton;
