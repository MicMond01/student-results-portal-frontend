import { Card, CardContent } from "@/components/ui/card";
import GradeDistributionChart from "@/components/ui-components/GradeDistributionChart";
import type { IAdminStatGradeDistribution, IAdminStatStats } from "../type";

interface GradeDistributionSectionProps {
  gradeDistribution: IAdminStatGradeDistribution;
}

const GradeDistributionSection = ({ gradeDistribution }: GradeDistributionSectionProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="font-semibold mb-4">Overall Grade Distribution</h3>
        <GradeDistributionChart distribution={gradeDistribution} />
      </CardContent>
    </Card>
  );
};

export default GradeDistributionSection;
