import { Card, CardContent } from "@/components/ui/card";
import Badge from "@/components/ui-components/Badge";
import { FileText } from "lucide-react";
import type { IAdminStatExam } from "../../type";

interface ExamsTabProps {
  exams: IAdminStatExam[];
}

const ExamsTab: React.FC<ExamsTabProps> = ({ exams }) => {
  return (
    <div className="space-y-4">
      {exams?.map((exam) => (
        <Card key={exam._id}>
          <CardContent className="p-5 flex items-center justify-between">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <FileText className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{exam.title}</h4>
                <p className="text-sm text-gray-500">
                  {exam.course.code} • {exam.session}
                </p>
                <div className="flex gap-2 mt-2">
                  <Badge variant="secondary" className="capitalize">
                    {exam.examType}
                  </Badge>
                  <Badge variant={exam.isActive ? "success" : "secondary"}>
                    {exam.isActive ? "Active" : "Closed"}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold">{exam.totalMarks}</div>
              <div className="text-xs text-gray-500">Marks</div>
            </div>
          </CardContent>
        </Card>
      ))}
      {exams?.length === 0 && (
        <p className="text-gray-500 text-center py-8">No active exams.</p>
      )}
    </div>
  );
};

export default ExamsTab;
