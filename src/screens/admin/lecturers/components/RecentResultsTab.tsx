import Table from "@/components/table/table";
import type { IAdminStatRecentResult } from "../type";

interface RecentResultsProps {
  results: IAdminStatRecentResult[];
}

const RecentResultsTab = ({ results }: RecentResultsProps) => {
  if (!results?.length) return <p>No recent results available.</p>;

  return (
    <div className="mt-4">
      <Table
        header={[{ label: "Student" }, { label: "Score" }, { label: "Grade" }]}
        rows={results}
        id="_id"
      />
    </div>
  );
};

export default RecentResultsTab;
