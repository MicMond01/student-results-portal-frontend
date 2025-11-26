import { Card, CardContent } from "@/components/ui/card";
import type { IAdminStatExam } from "../type";
interface ExamProps {
  exams: IAdminStatExam[];
}
const ExamsTab = ({ exams }: ExamProps) => {
  if (!exams?.length) return <p>No exams found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
      {exams.map((exam) => (
        <Card key={exam._id}>
          <CardContent className="p-4">
            <h3 className="font-semibold">{exam.title}</h3>
            <p className="text-sm text-muted-foreground">{exam.semester}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExamsTab;
