import { useGetAllResultsQuery } from "@/redux/query/admin-results";

const AdminResults = () => {
  const { data } = useGetAllResultsQuery();
  console.log(data);
  return <div>AdminResults</div>;
};

export default AdminResults;
