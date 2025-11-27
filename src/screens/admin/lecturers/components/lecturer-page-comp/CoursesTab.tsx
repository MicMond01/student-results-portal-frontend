import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui-components/Badge";
import type { IAdminStatCourse } from "../../type";

interface CoursesTabProps {
  courses: IAdminStatCourse[];
}

const CoursesTab: React.FC<CoursesTabProps> = ({ courses }) => {
  return (
    <div className="space-y-4">
      {courses?.map((course) => (
        <Card key={course._id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-lg text-gray-900">
                    {course.title}
                  </h3>
                  <Badge variant="outline">{course.code}</Badge>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {course.level}L • {course.semester} Semester •{" "}
                  {course.session}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-indigo-600">
                  {course.passRate}%
                </div>
                <div className="text-xs text-gray-500 uppercase font-medium">
                  Pass Rate
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t pt-4 bg-gray-50 -mx-5 -mb-5 px-5 pb-4 mt-4">
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">
                  {course.totalStudents}
                </div>
                <div className="text-xs text-gray-500">Students</div>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <div className="text-lg font-semibold text-gray-800">
                  {course.averageScore}
                </div>
                <div className="text-xs text-gray-500">Avg Score</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-800">
                  {course.totalResults}
                </div>
                <div className="text-xs text-gray-500">Results</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CoursesTab;
