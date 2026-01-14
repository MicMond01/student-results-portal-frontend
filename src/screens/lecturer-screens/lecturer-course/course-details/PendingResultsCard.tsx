import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

import type { StudentsWithoutResult } from "./types";

interface PendingResultsCardProps {
  student: StudentsWithoutResult[];
  onEdit?: () => void;
  onSelectStudent: (id: string) => void;
}

const PendingResultsCard: React.FC<PendingResultsCardProps> = ({
  student,
  onEdit,
  onSelectStudent,
}) => {
  return (
    <Card className="w-full rounded-2xl shadow-sm max-h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Pending Results</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Pending Student */}
        {student.map((student) => (
          <div className="flex items-center justify-between rounded-xl bg-red-50 px-4 py-3">
            <div className="grid items-center gap-3 ">
              <div key={student._id} className="flex items-center gap-3 ">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-sm font-semibold text-red-600">
                  {student.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{student.name}</p>
                  <p className="text-sm text-gray-600 ">
                    {student.matricNo} • {student.department.name}
                  </p>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => {
                    onEdit?.();
                    onSelectStudent(student.matricNo);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {/* Info Box */}
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-6 text-center text-sm text-gray-500">
          All other results have been processed.
        </div>
      </CardContent>
    </Card>
  );
};

export default PendingResultsCard;
