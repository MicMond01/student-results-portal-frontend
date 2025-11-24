import Progress from "./Progress";

const GradeDistributionChart: React.FC<{
  distribution: Record<string, number>;
}> = ({ distribution }) => {
  const grades = ["A", "B", "C", "D", "E", "F"];
  const total = Object.values(distribution).reduce((a, b) => a + b, 0);

  const getPercentage = (count: number) =>
    total > 0 ? Math.round((count / total) * 100) : 0;

  const colors: Record<string, string> = {
    A: "bg-green-500",
    B: "bg-blue-500",
    C: "bg-yellow-500",
    D: "bg-orange-500",
    E: "bg-red-400",
    F: "bg-red-600",
  };

  return (
    <div className="space-y-4">
      {grades.map((grade) => {
        const count = distribution[grade] || 0;
        const percentage = getPercentage(count);
        return (
          <div key={grade} className="flex items-center gap-4">
            <div className="w-8 text-sm font-bold text-gray-700">{grade}</div>
            <div className="flex-1">
              <Progress
                value={percentage}
                indicatorClassName={colors[grade]}
                className="h-2.5"
              />
            </div>
            <div className="w-12 text-right text-sm text-gray-500">
              {count} ({percentage}%)
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GradeDistributionChart;
