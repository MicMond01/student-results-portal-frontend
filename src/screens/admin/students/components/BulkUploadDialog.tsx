import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import {
  useBulkCreateStudentsMutation,
  useLazyGetDownloadUploadStudentsTemplateQuery,
} from "@/redux/query/admin-students";
import { useAdminStudentsStore } from "@/stores/useAdminStudentsStore";
import { FileSpreadsheet, FileText, Loader2, Upload, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const BulkUploadDialog = () => {
  const [file, setFile] = useState<File | null>(null);

  const { isBulkUploadOpen, setIsBulkUploadOpen, closeBulkDialog } =
    useAdminStudentsStore();
  const [getTemplate] = useLazyGetDownloadUploadStudentsTemplateQuery();
  const { data: allDepartments } = useGetAllDepartmentsQuery();
  const [bulkUploadTrigger, { isLoading }] = useBulkCreateStudentsMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const [departmentId, setDepartmentId] = useState<string>("");

  console.log(departmentId);
  
  const handleUpload = async () => {
    if (file && departmentId) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("department", departmentId);

      try {
        await bulkUploadTrigger(formData).unwrap();
        toast.success("Students uploaded successfully");
        closeBulkDialog();
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to upload students");
      }
    }
  };

  const downloadExamFormat = async (format: string) => {
    const toastId = toast.loading("Downloading template...");
    try {
      const blob = await getTemplate(format).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `student_upload_template.${
        format === "txt" ? "txt" : "xlsx"
      }`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success("Template downloaded successfully", { id: toastId });
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error(error.message || "Failed to download template", {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={isBulkUploadOpen} onOpenChange={setIsBulkUploadOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk Upload Students</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label>Download Templates</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadExamFormat("excel")}
                >
                  <FileSpreadsheet className="mr-2 h-4 w-4" /> Excel
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => downloadExamFormat("txt")}
                >
                  <FileText className="mr-2 h-4 w-4" /> TXT
                </Button>
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Download a template to ensure your data is formatted correctly.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select
              value={departmentId}
              onValueChange={(value) => {
                setDepartmentId(value);
              }}
            >
              <SelectTrigger id="department">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent>
                {allDepartments?.departments.map((d) => (
                  <SelectItem key={d._id} value={d._id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6" />
            </div>
            <div className="text-sm">
              <label
                htmlFor="file-upload"
                className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
              >
                Click to upload
                <input
                  id="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".txt, .xlsx, .xls"
                />
              </label>
              <span className="text-gray-500"> or drag and drop</span>
            </div>
            <p className="text-xs text-gray-500">TXT or Excel files only</p>
            {file && (
              <div className="mt-4 p-2 bg-gray-50 rounded text-sm text-gray-700 font-medium flex items-center justify-center gap-2">
                {file.name}
                <button
                  onClick={() => setFile(null)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={closeBulkDialog}>
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || isLoading || !departmentId}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Upload className="mr-2 h-4 w-4" />
            )}
            Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BulkUploadDialog;
