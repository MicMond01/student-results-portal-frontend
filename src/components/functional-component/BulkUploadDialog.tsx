import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Download, Loader2, Upload } from "lucide-react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { useLecturerExamsStore } from "@/stores/useLecturerExamsStore";
import {
  useGetDownloadTemplateQuery,
  useLazyGetDownloadTemplateQuery,
} from "@/redux/query/lecturer-exam";

interface BulkUploadDialogProps {
  examId: string;
  open: boolean;
  onUpload: (examId: string, file: File) => void;
  isUploading: boolean;
}

const BulkUploadDialog = ({
  examId,
  open,
  onUpload,
  isUploading,
}: BulkUploadDialogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { closeQuestionDialog } = useLecturerExamsStore();
  const [getTemplate] = useLazyGetDownloadTemplateQuery();

  const downloadExamFormat = async (format: string) => {
    try {
      const blob = await getTemplate(format).unwrap();

      // a temporary URL for the blob
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `exam_template.${format === "txt" ? "txt" : "xlsx"}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Check file type based on your multer config
      const allowedTypes = [
        "text/plain",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (!allowedTypes.includes(selectedFile.type)) {
        setError(
          "Invalid file type. Please upload a .txt, .xls, or .xlsx file."
        );
        setFile(null);
      } else {
        setFile(selectedFile);
        setError(null);
      }
    }
  };

  const handleUpload = () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    onUpload(examId, file);
    // The parent (LecturerExamPage) will handle closing the dialog on success
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    closeQuestionDialog();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Bulk Upload Questions</DialogTitle>
          <DialogDescription>
            Upload a TXT or Excel file to add multiple questions at once.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 p-4">
          {/* Template Download Links */}
          <div className="space-y-2">
            <Label>Download Templates</Label>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadExamFormat("excel")}
              >
                {/* <a href={`${API_BASE_URL}/exams/templates/excel`} download>
                </a> */}
                <Download className="mr-2 h-4 w-4" />
                Excel (.xlsx)
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadExamFormat("txt")}
              >
                {/* <a href={`${API_BASE_URL}/exams/templates/txt`} download>
                </a> */}
                <Download className="mr-2 h-4 w-4" />
                Text (.txt)
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Use one of the provided templates to format your questions.
            </p>
          </div>

          <Separator />

          {/* File Upload */}
          <div className="space-y-2">
            <Label htmlFor="file-upload">Upload File</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".txt, .xls, .xlsx, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={handleFileChange}
            />
            {file && (
              <p className="text-sm text-green-600">Selected: {file.name}</p>
            )}
            {error && (
              <p className="text-sm font-medium text-destructive">{error}</p>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isUploading}
          >
            Cancel
          </Button>
          <Button onClick={handleUpload} disabled={!file || isUploading}>
            {isUploading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload File
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadDialog;
