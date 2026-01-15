import { useGetCoursesByDepartmentQuery } from "@/redux/query/admin-courses";
import { useGetAllDepartmentsQuery } from "@/redux/query/admin-departments";
import { useGetStudentsByDepartmentQuery } from "@/redux/query/admin-students";
import {
  useAdminResultsStore,
  useModalState,
  useResultFormData,
} from "@/stores/useAdminResultsStore";
import { useMemo } from "react";

export const useResultsDialog = () => {
  const modals = useModalState();
  const resultForm = useResultFormData();
  const { updateResultForm, setStudentForForm, closeModals } =
    useAdminResultsStore();

  const { data: departments } = useGetAllDepartmentsQuery();
  const { data: departmentStudents } = useGetStudentsByDepartmentQuery(
    resultForm.departmentId,
    { skip: !resultForm.departmentId }
  );

  const { data: departmentCourses } = useGetCoursesByDepartmentQuery(
    resultForm.departmentId,
    { skip: !resultForm.departmentId }
  );

  console.log("resultFormDepartmentId", resultForm.departmentId);

  const isFormValid = useMemo(() => {
    return (
      resultForm.studentId &&
      resultForm.courseId &&
      resultForm.ca !== undefined &&
      resultForm.exam !== undefined
    );
  }, [resultForm]);

  const handleDepartmentChange = (departmentId: string) => {
    updateResultForm({
      departmentId,
      studentId: "",
      matricNo: "",
      studentName: "",
      courseId: "",
      courseCode: "",
      courseTitle: "",
    });
  };

  const handleStudentChange = (studentId: string) => {
    const student = departmentStudents?.students?.find(
      (s: any) => s._id === studentId
    );
    if (student) {
      setStudentForForm(student._id, student.matricNo, student.name);
    }
  };

  const handleCourseChange = (courseId: string) => {
    const course = departmentCourses?.courses?.find(
      (c: any) => c._id === courseId
    );
    if (course) {
      updateResultForm({
        courseCode: course.code,
        courseTitle: course.title,
        courseId: course._id,
        unit: course.creditUnit || 3,
      });
    }
  };

  return {
    modals,
    resultForm,
    departments,
    students: departmentStudents?.students,
    courses: departmentCourses?.courses,
    isFormValid,
    updateResultForm,
    handleDepartmentChange,
    handleStudentChange,
    handleCourseChange,
    closeModals,
  };
};
