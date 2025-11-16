import { useGetAllCoursesQuery } from "@/redux/query/admin-courses";

const AdminCourses = () => {
  const { data } = useGetAllCoursesQuery();
  console.log(data);
  return <div>AdminCourses</div>;
};

export default AdminCourses;
