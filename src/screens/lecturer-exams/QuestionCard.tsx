import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuestionOption from "./QuestionOption";
import { Badge } from "@/components/ui/badge";
import { Check, Edit, HelpCircle, ListOrdered, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { IQuestion } from "@/types/exams";

const QuestionCard = ({
  question,
  index,
}: {
  question: IQuestion;
  index: number;
}) => {
  console.log(question);
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Question {index + 1}</CardTitle>
          <Badge variant="secondary" className="px-3 py-1 text-sm">
            {question.marks} Marks
          </Badge>
        </div>
        <CardDescription className="flex items-center pt-1 capitalize">
          {question.questionType === "objective" ? (
            <ListOrdered className="mr-1.5 h-4 w-4" />
          ) : (
            <HelpCircle className="mr-1.5 h-4 w-4" />
          )}
          {question.questionType} Question
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Question Text */}
        <p className="text-base leading-relaxed text-gray-800">
          {question.question}
        </p>

        {/* Options (for 'objective') */}
        {question.questionType === "objective" && question.options && (
          <div className="space-y-2">
            {question.options.map((optionText, idx) => (
              <QuestionOption
                key={idx}
                optionText={optionText}
                correctAnswer={question.correctAnswer}
                optionLetter={String.fromCharCode(97 + idx).toUpperCase()} // A, B, C...
              />
            ))}
          </div>
        )}

        {/* Answer (for 'theory') */}
        {question.questionType === "theory" && question.modelAnswer && (
          <div className="rounded-md border border-blue-200 bg-blue-50 p-4">
            <h4 className="mb-2 flex items-center text-sm font-semibold text-blue-800">
              <Check className="mr-1.5 h-4 w-4" />
              Model Answer
            </h4>
            <p className="text-sm text-blue-700">{question.modelAnswer}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end space-x-2 bg-gray-50 p-3">
        <Button variant="ghost" size="sm" className="hover:bg-primary-4/10">
          <Edit className="mr-1.5 h-4 w-4" />
          Edit
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:bg-red-50"
        >
          <Trash className="mr-1.5 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default QuestionCard;
