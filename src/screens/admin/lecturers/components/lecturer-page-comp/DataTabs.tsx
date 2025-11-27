import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CoursesTab from "./CoursesTab";
import ExamsTab from "./ExamsTab";
import RecentResultsTab from "./RecentResultsTab";
import type {
  IAdminStatCourse,
  IAdminStatExam,
  IAdminStatRecentResult,
} from "../../type";

interface DataTabsProps {
  courses: IAdminStatCourse[];
  exams: IAdminStatExam[];
  recentResults: IAdminStatRecentResult[];
}

const DataTabs: React.FC<DataTabsProps> = ({
  courses,
  exams,
  recentResults,
}) => {
  return (
    <Tabs defaultValue="courses">
      <TabsList>
        <TabsTrigger value="courses">Courses ({courses?.length})</TabsTrigger>
        <TabsTrigger value="exams">Active Exams ({exams?.length})</TabsTrigger>
        <TabsTrigger value="recent">Recent Results Log</TabsTrigger>
      </TabsList>

      <TabsContent value="courses">
        <CoursesTab courses={courses} />
      </TabsContent>

      <TabsContent value="exams">
        <ExamsTab exams={exams} />
      </TabsContent>

      <TabsContent value="recent">
        <RecentResultsTab recentResults={recentResults} />
      </TabsContent>
    </Tabs>
  );
};

export default DataTabs;
