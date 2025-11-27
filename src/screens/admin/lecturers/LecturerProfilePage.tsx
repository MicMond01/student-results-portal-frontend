import { useState } from "react";
import type { IAdminLecturer, LecturerFormData } from "./type";
import {
  useDeleteLecturerMutation,
  useGetLectureDetailsQuery,
  useUpdateLecturerMutation,
  useUpdateLecturerPasswordMutation,
} from "@/redux/query/admin-lecturers";
import { toast } from "sonner";
import { useAdminLecturersStore } from "@/stores/useAdminLecturersStore";
import LecturerProfileSkeleton from "./components/lecturer-profile-skeleton";
import ManageLecturerDialog from "./manage-lecturer-dialog";
import { useParams } from "react-router-dom";
import ProfileHeader from "./components/lecturer-page-comp/ProfileHeader";
import StatsGrid from "./components/lecturer-page-comp/StatsGrid";
import DataTabs from "./components/lecturer-page-comp/DataTabs";
import AnalyticsSidebar from "./components/lecturer-page-comp/AnalyticsSidebar";

const LecturerProfilePage = () => {
  const { id } = useParams();
  const [deleteLecturerTrigger, { isLoading: isDeleting }] =
    useDeleteLecturerMutation();
  const [updateLecturerTrigger, { isLoading: isUpdating }] =
    useUpdateLecturerMutation();

  const [updateLecturerPasswordTrigger, { isLoading: isUpdatingPassword }] =
    useUpdateLecturerPasswordMutation();

  const { openEditDialog, closeDialog } = useAdminLecturersStore();

  const { data: lecturerDetails, isLoading } = useGetLectureDetailsQuery(id);
  const {
    lecturer: lecturerData,
    stats,
    courses,
    exams,
    recentResults,
  } = lecturerDetails || {};

  const [showReset, setShowReset] = useState(false);

  const updateLecturerPassword = async (data: string) => {
    const toastId = toast.loading("Updating password...");
    try {
      await updateLecturerPasswordTrigger({
        id: lecturerData?._id || "",
        data,
      }).unwrap();
      toast.success("Password successfully updated!", { id: toastId });
      closeDialog();
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update password", {
        id: toastId,
      });
    }
  };

  const handleDeleteLecturer = async (id: string) => {
    const toastId = toast.loading("Deleting Lecturer...");

    try {
      await deleteLecturerTrigger(id).unwrap();

      toast.success("Lecturer successfully Deleted!", { id: toastId });
    } catch (error: any) {
      toast.error(error?.data?.message || error.data.msg, {
        id: toastId,
      });
    }
  };

  const handleSaveLecturer = async (data: LecturerFormData) => {
    const toastId = toast.loading("Updating Lecturer Profile...");

    try {
      await updateLecturerTrigger({
        id: lecturerData?._id || "",
        data,
      }).unwrap();
      toast.success("Lecturer successfully updated!", { id: toastId });
      closeDialog();
    } catch (error: any) {
      const message =
        error?.data?.msg || error?.data?.message || "An error occurred";
      toast.error(message, { id: toastId });
    }
  };

  if (isLoading) {
    return <LecturerProfileSkeleton />;
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 animate-in fade-in duration-300">
      <div className="mx-auto max-w-380 space-y-6">
        <ProfileHeader
          lecturerData={lecturerData}
          isDeleting={isDeleting}
          onEdit={() => openEditDialog(lecturerData as IAdminLecturer)}
          onDelete={handleDeleteLecturer}
        />

        <StatsGrid stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <DataTabs
              courses={courses || []}
              exams={exams || []}
              recentResults={recentResults || []}
            />
          </div>

          <AnalyticsSidebar
            stats={stats}
            lecturerData={lecturerData}
            showReset={showReset}
            setShowReset={setShowReset}
            onResetSubmit={updateLecturerPassword}
            isUpdatingPassword={isUpdatingPassword}
          />
        </div>
      </div>

      <ManageLecturerDialog
        onSave={handleSaveLecturer}
        isLoading={isUpdating}
      />
    </div>
  );
};

export default LecturerProfilePage;
