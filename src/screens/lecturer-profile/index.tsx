import { useGetLecturerProfileQuery } from "@/redux/query/lecturer";
import StatisticsGrid from "./lecturer-profile-compo/StatisticsGrid";
import AboutLecturer from "./lecturer-profile-compo/AboutLecturer";
import CourseList from "./lecturer-profile-compo/CourseList";
import { Skeleton } from "@/components/ui/skeleton";
import LecturerSidebar from "./lecturer-profile-compo/LecturerSidebar";
import ProfileHeader from "./lecturer-profile-compo/ProfileHeader";

const LecturerProfile = () => {
  const { data: lecturerData, isLoading } = useGetLecturerProfileQuery();
  const { lecturer, stats, latestCourse, courses } = lecturerData || {};

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-380">
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content Area (Spans 2 columns on desktop) */}
          <main className="space-y-6 lg:col-span-2">
            {lecturerData && (
              <>
                {lecturer && <ProfileHeader lecturer={lecturer} />}
                {stats && <StatisticsGrid stats={stats} />}
                {lecturer && <AboutLecturer lecturer={lecturer} />}
                {courses && <CourseList courses={courses} />}
              </>
            )}
          </main>

          {/* Sidebar (Spans 1 column on desktop) */}
          {lecturer && latestCourse && (
            <LecturerSidebar lecturer={lecturer} latestCourse={latestCourse} />
          )}
        </div>
      </div>
    </div>
  );
};

const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="max-w-7xl mx-auto">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[600px]" />
        <Skeleton className="lg:col-span-2 h-[600px]" />
      </div>
    </div>
  </div>
);
export default LecturerProfile;
