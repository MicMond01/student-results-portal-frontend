import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X } from "lucide-react";
import {
  useEditStudentResultMutation,
  useGetResultWithStudentInfoQuery,
} from "@/redux/query/lecturer";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import { ConfirmationDialog } from "@/components/ui-components/Confiramtion-Dialog";

const StudentDetail = () => {
  const { id: resultId } = useParams();
  const navigate = useNavigate();
  const [editStudentResult] = useEditStudentResultMutation();
  const { data, isLoading } = useGetResultWithStudentInfoQuery(resultId, {
    skip: !resultId,
  });

  // const [updateResult, { isLoading: isUpdating }] = useUpdateResultMutation();
  const [activeTab, setActiveTab] = useState("edit-result");

  // Form state
  const [formData, setFormData] = useState({
    ca: 0,
    exam: 0,
    semester: "",
    session: "",
  });

  const isUnchanged =
    formData.ca === data?.result.ca &&
    formData.exam === data?.result.exam &&
    formData.semester === data?.result.semester &&
    formData.session === data?.result.session;

  useEffect(() => {
    if (data?.result) {
      setFormData({
        ca: data.result.ca || 0,
        exam: data.result.exam || 0,
        semester: data.result.semester || "",
        session: data.result.session || "",
      });
    }
  }, [data]);

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };


  const handleSave = async () => {
    const toastId = toast.loading("Updating result...");

    try {
      await editStudentResult({
        id: resultId,
        data: formData,
      }).unwrap();

      toast.success("Result updated successfully!", { id: toastId });

      navigate(-1);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update result", {
        id: toastId,
      });
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const getInitials = (name?: string) => {
    const str = name ?? "";
    return str
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="">
      <div className="max-w-380 mx-auto">
        {/* Back Button */}
        <Button variant="ghost" className="mb-6" onClick={handleCancel}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Students
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Side - Student Info Card */}
          <Card className="lg:col-span-1 border-0">
            <CardContent className="p-6 ">
              {/* Profile Header */}
              <div className="flex flex-col items-center mb-6">
                {/* Decorative Background */}
                <div className="w-full h-32 bg-linear-to-r from-blue-200 via-orange-200 to-blue-300 rounded-t-lg mb-[-64px]" />

                {/* Avatar */}
                <div className="relative">
                  <Avatar className="h-32 w-32 border-4 border-background">
                    <AvatarImage src="" alt={data?.student.name} />
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {getInitials(data?.student.name)}
                    </AvatarFallback>
                  </Avatar>
                </div>

                {/* Name and Email */}
                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-primary-4 ">
                    {data?.student.name}
                  </h2>
                  <p className="text-sm text-primary-4">
                    {data?.student.name.replace(" ", "")}@school.edu
                  </p>
                </div>
              </div>

              {/* Personal Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Personal Info</h3>

                <InfoRow label="Full Name" value={data?.student.name || ""} />
                <InfoRow
                  label="Matric Number"
                  value={data?.student.identifier || ""}
                />
                <InfoRow
                  label="Email"
                  value={`${data?.student.name.replace(" ", "")}@school.edu`}
                />
                <InfoRow label="Level" value={`200 Level`} />
                <InfoRow label="Department" value="Computer Science" />
              </div>
            </CardContent>
          </Card>

          {/* Right Side - Tabs */}
          <Card className="lg:col-span-2 border-0">
            <CardContent className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="edit-result">Edit Result</TabsTrigger>
                  <TabsTrigger value="change-password">
                    Change Password
                  </TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>

                {/* Edit Result Tab */}
                <TabsContent value="edit-result" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Edit Student Result
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Update the student's scores and information below.
                    </p>
                  </div>

                  {/* Course Info Display */}
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Course Code
                        </p>
                        <p className="font-semibold">
                          {data?.result.course.code || ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Course Title
                        </p>
                        <p className="font-semibold">
                          {data?.result.course.title || ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Credit Unit
                        </p>
                        <p className="font-semibold">
                          {data?.result.course.creditUnit || ""}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Level</p>
                        <p className="font-semibold">
                          {data?.result.course.level || ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CA Score */}
                    <div className="space-y-2">
                      <Label htmlFor="ca">
                        CA Score <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="ca"
                        type="number"
                        min="0"
                        max="40"
                        placeholder="Enter CA score (max 40)"
                        value={formData.ca || 0}
                        onChange={(e) =>
                          handleInputChange("ca", Number(e.target.value))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum: 40 marks
                      </p>
                    </div>

                    {/* Exam Score */}
                    <div className="space-y-2">
                      <Label htmlFor="exam">
                        Exam Score <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="exam"
                        type="number"
                        min="0"
                        max="60"
                        placeholder="Enter exam score (max 60)"
                        value={formData.exam || 0}
                        onChange={(e) =>
                          handleInputChange("exam", Number(e.target.value))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Maximum: 60 marks
                      </p>
                    </div>

                    {/* Session */}
                    <div className="space-y-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Session</p>
                        <p className="font-semibold">
                          {data?.result.course.session || ""}
                        </p>
                      </div>
                    </div>

                    {/* Semester */}
                    <div className="space-y-2">
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Semester
                          </p>
                          <p className="font-semibold">
                            {data?.result.course.semester || ""} Semester
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculated Results */}
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Calculated Results</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Total Score
                        </p>
                        <p className="text-2xl font-bold text-primary">
                          {(data?.result?.ca ?? 0) + (data?.result?.exam ?? 0)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Grade</p>
                        <Badge>{data?.result?.grade ?? "N/A"}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 justify-end pt-4">
                    <Button
                      variant="outline"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      <X className="mr-2 h-4 w-4" />
                      Cancel
                    </Button>

                    <ConfirmationDialog
                      title="Confirm Save"
                      description="Are you sure you want to update this student result? "
                      action={handleSave}
                      type="save"
                      triggerLabel="Save"
                      confirmLabel={isLoading ? "Saving..." : "Yes, Save"}
                    />
                  </div>
                </TabsContent>

                {/* Change Password Tab */}
                <TabsContent value="change-password" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Change Student Password
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Reset the student's password. This feature is coming soon.
                    </p>
                  </div>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>This feature will be available in the next update.</p>
                  </div>
                </TabsContent>

                {/* Notifications Tab */}
                <TabsContent value="notifications" className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">
                      Notification Settings
                    </h3>
                    <p className="text-sm text-muted-foreground mb-6">
                      Configure notification preferences. This feature is coming
                      soon.
                    </p>
                  </div>
                  <div className="text-center py-12 text-muted-foreground">
                    <p>This feature will be available in the next update.</p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>{" "}
    </div>
  );
};

// Info Row Component
const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-sm text-muted-foreground">{label}</span>
    <span className="text-sm font-medium">{value}</span>
  </div>
);

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="min-h-screen bg-background p-6">
    <div className="max-w-7xl mx-auto">
      <Skeleton className="h-10 w-32 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Skeleton className="h-[600px]" />
        <Skeleton className="lg:col-span-2 h-[600px]" />
      </div>
    </div>
  </div>
);

export default StudentDetail;
