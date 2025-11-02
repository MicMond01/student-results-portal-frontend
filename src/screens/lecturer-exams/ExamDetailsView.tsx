import type { IExam, IExamCourse } from "@/types/exams";
import QuestionCard from "./QuestionCard";
import { Card } from "@/components/ui/card";
import { AlertCircle, ClipboardList } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import ExamHeader from "./ExamHeader";

const ExamDetailsView = ({
  course,
  exams,
}: {
  course: IExamCourse | undefined;
  exams: IExam[];
}) => {
  if (!course) {
    return (
      <Card className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            No Course Selected
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Please select a course from the list to view its exam questions.
          </p>
        </div>
      </Card>
    );
  }

  // Placeholder if course has no exams
  if (exams.length === 0) {
    return (
      <Card className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-xl font-semibold text-gray-900">
            No Exams Found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no exams set up for {course.title}.
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {exams.map((exam) => (
        <section key={exam._id} className="space-y-6">
          {/* Render the header for THIS exam */}
          <ExamHeader course={course} exam={exam} />
          {/* Render the questions for THIS exam */}
          {exam.questions.map((q, index) => (
            <QuestionCard key={q._id} question={q} index={index} />
          ))}
          {/* Add a separator between exams */}
          <Separator className="my-8" />
        </section>
      ))}
    </div>
  );
};

export default ExamDetailsView;

