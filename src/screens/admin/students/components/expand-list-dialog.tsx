import Badge from "@/components/ui-components/Badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";

const ExpandListDialog = () => {
  const { activeListDialog, setActiveListDialog, selectedStudent } =
    useAdminStudentsStore();
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
        <div className="mt-4">
          {activeListDialog === "courses" && (
            <div className="space-y-2">
              {selectedStudent?.courses?.[100]?.First.map((course, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-bold text-gray-900">
                      {course.code} - {course.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {course.creditUnit} Units
                    </p>
                  </div>
                  <Badge variant="outline">{course.status}</Badge>
                </div>
              ))}
            </div>
          )}
          {activeListDialog === "results" && (
            <div className="space-y-2">
              {mockResults.map((result, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-bold text-gray-900">{result.course}</p>
                    <p className="text-xs text-gray-500">{result.session}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-700">
                      {result.score}
                    </span>
                    <Badge
                      className={
                        result.grade === "A"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {result.grade}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExpandListDialog;
