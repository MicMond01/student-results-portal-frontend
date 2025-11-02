import { cn } from "@/lib/utils";

type QuestionOption = { id: string; text: string };

const QuestionOption = ({
  optionText,
  correctAnswer,
  optionLetter,
}: {
  optionText: string;
  correctAnswer?: string;
  optionLetter: string;
}) => {
  const isAnswer = optionText === correctAnswer;

  return (
    <div
      className={cn(
        "flex items-center space-x-3 rounded-md border p-3",
        isAnswer ? "border-green-600 bg-green-50" : "border-gray-200 bg-gray-50"
      )}
    >
      <div
        className={cn(
          "flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold",
          isAnswer ? "bg-green-600 text-white" : "bg-gray-300 text-gray-700"
        )}
      >
        {optionLetter}
      </div>
      <p
        className={cn(
          "text-sm",
          isAnswer ? "font-semibold text-green-800" : "text-gray-700"
        )}
      >
        {optionText}
      </p>
    </div>
  );
};

export default QuestionOption;
