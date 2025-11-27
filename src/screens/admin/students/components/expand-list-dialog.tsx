import Badge from "@/components/ui-components/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import type { AllResult, Courses, IAdminStudentData } from "../types";

const ExpandListDialog = ({
  studentData,
}: {
  studentData: IAdminStudentData;
}) => {
  const { activeListDialog, setActiveListDialog } = useAdminStudentsStore();

  // Group results by session and semester for better display
  const groupedResults = studentData?.allResults?.reduce((acc, result) => {
    const sess = result.session || "Unknown";
    const sem = result.semester;
    if (!acc[sess]) acc[sess] = {};
    if (!acc[sess][sem]) acc[sess][sem] = [];
    acc[sess][sem].push(result);
    return acc;
  }, {} as Record<string, Record<string, AllResult[]>>);

  return (
    <Dialog
      open={activeListDialog !== null}
      onOpenChange={(open) => !open && setActiveListDialog(null)}
    >
      <DialogContent className="max-w-3xl h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            {activeListDialog === "courses"
              ? "Registered Courses"
              : "Academic Results History"}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 overflow-y-auto h-[calc(80vh-100px)]">
          {activeListDialog === "courses" && (
            <div className="space-y-6">
              {Object.keys(studentData?.courses || {})
                .sort((a, b) => parseInt(a) - parseInt(b))
                .map((level) => {
                  const levelKey = Number(level) as keyof Courses; // FIX

                  return (
                    <div key={level} className=" mx-8">
                      <h3 className="font-semibold mb-2">{level} Level</h3>

                      <div className="space-y-4">
                        {["First", "Second"].map((semester) => {
                          const semCourses =
                            studentData?.courses?.[levelKey]?.[
                              semester as "First" | "Second"
                            ] || [];

                          if (!semCourses.length) return null;

                          return (
                            <div key={semester}>
                              <h4 className="text-sm font-medium text-gray-600 mb-2">
                                {semester} Semester
                              </h4>

                              <div className="space-y-2">
                                {semCourses.map((course, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <p className="font-bold text-gray-900">
                                        {course.code} - {course.title}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {course.creditUnit} Units •{" "}
                                        {course.session}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        Lecturer: {course.lecturer.name} (
                                        {course.lecturer.rank})
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {activeListDialog === "results" && (
            <div className="space-y-6">
              {Object.keys(groupedResults || {})
                .sort((a, b) => b.localeCompare(a))
                .map((session) => (
                  <div key={session}>
                    <h3 className="font-semibold mb-2">{session} Session</h3>
                    <div className="space-y-4">
                      {Object.keys(groupedResults?.[session] || {})
                        .sort()
                        .map((semester) => {
                          const semResults =
                            groupedResults?.[session][semester];
                          if (!semResults?.length) return null;
                          return (
                            <div key={semester} className=" mx-8">
                              <h4 className="text-sm font-medium text-gray-600 mb-2">
                                {semester} Semester
                              </h4>
                              <div className="space-y-2">
                                {semResults.map((result, i) => (
                                  <div
                                    key={i}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                  >
                                    <div>
                                      <p className="font-bold text-gray-900">
                                        {result.course.code} -{" "}
                                        {result.course.title}
                                      </p>
                                      <p className="text-xs text-gray-500">
                                        {result.course.creditUnit} Units
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                      <span className="font-bold text-gray-700">
                                        {result.total}
                                      </span>
                                      <Badge
                                        className={
                                          result.grade === "A"
                                            ? "bg-green-100 text-green-800"
                                            : result.grade === "B"
                                            ? "bg-blue-100 text-blue-800"
                                            : result.grade === "C"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : result.grade === "D" ||
                                              result.grade === "E"
                                            ? "bg-orange-100 text-orange-800"
                                            : "bg-red-100 text-red-800"
                                        }
                                      >
                                        {result.grade}
                                      </Badge>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              {studentData?.allResults?.length === 0 && (
                <p className="text-gray-500 text-center">
                  No results available.
                </p>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandListDialog;
