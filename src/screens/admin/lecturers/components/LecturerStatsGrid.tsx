import { Card, CardContent } from "@/components/ui/card";
import type { IAdminStats } from "../type";


const LecturerStatsGrid = ({ lecturer }: { lecturer: IAdminStats }) => {
const stats = [
{ label: "Total Courses", value: lecturer.stats.totalCourses },
{ label: "Students Taught", value: lecturer.stats.totalStudentsAcrossAllCourses },
{ label: "Pass Rate", value: lecturer.stats.passRate + "%" },
{ label: "Avg Performance", value: lecturer.stats.averagePerformance + "%" },
];


return (
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
{stats.map((s) => (
<Card key={s.label}>
<CardContent className="p-4 text-center">
<p className="text-sm text-muted-foreground">{s.label}</p>
<p className="text-xl font-semibold">{s.value}</p>
</CardContent>
</Card>
))}
</div>
);
};


export default LecturerStatsGrid;