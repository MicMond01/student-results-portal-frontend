import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui-components/Badge";
import type { IAdminStatRecentResult } from "../../type";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";

interface RecentResultsTabProps {
  recentResults: IAdminStatRecentResult[];
}

const RecentResultsTab: React.FC<RecentResultsTabProps> = ({
  recentResults,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Recently Uploaded Results</CardTitle>
        <Button
          size="sm"
          className="ml-auto"
          onClick={() => navigate(`/admin/results/lecturer/${id}`)}
        >
          View All
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium border-b">
              <tr>
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course</th>
                <th className="px-4 py-3 text-center">Score</th>
                <th className="px-4 py-3 text-center">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentResults?.map((result) => (
                <tr key={result._id} className="hover:bg-gray-50/50">
                  <td className="px-4 py-3">
                    <div className="font-medium text-gray-900">
                      {result.student.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {result.student.matricNo}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    {result.course.code}
                  </td>
                  <td className="px-4 py-3 text-center font-medium">
                    {result.total}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <Badge
                      variant={
                        ["A", "B"].includes(result.grade)
                          ? "success"
                          : ["C", "D", "E"].includes(result.grade)
                          ? "warning"
                          : "danger"
                      }
                    >
                      {result.grade}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentResultsTab;
