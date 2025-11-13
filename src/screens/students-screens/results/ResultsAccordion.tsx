import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import ResultsTable from "./table-config/ResultsTable";
import type { IResult } from "./type";
interface ResultsAccordionProps {
  filteredData: IResult[];
  selectedSemester: string;
}

const ResultsAccordion = ({
  filteredData,
  selectedSemester,
}: ResultsAccordionProps) => (
  <Accordion
    type="multiple"
    defaultValue={filteredData?.map((g) => g.session)}
    className="space-y-4"
  >
    {filteredData?.map((group) => (
      <AccordionItem
        value={group.session}
        key={group.session}
        className="rounded-lg bg-white shadow-sm"
      >
        <AccordionTrigger className="px-6 py-4 text-lg font-medium">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {group.session} Session
          </div>
        </AccordionTrigger>
        <AccordionContent className="p-0">
          <Tabs
            defaultValue={
              selectedSemester === "all" ? "First" : selectedSemester
            }
            className="w-full p-4"
          >
            <TabsList
              className={cn(
                "grid w-full",
                selectedSemester === "all"
                  ? "grid-cols-2 md:w-[300px]"
                  : "grid-cols-1 md:w-[150px]"
              )}
            >
              {(selectedSemester === "all" || selectedSemester === "First") && (
                <TabsTrigger value="First">First Semester</TabsTrigger>
              )}
              {(selectedSemester === "all" ||
                selectedSemester === "Second") && (
                <TabsTrigger value="Second">Second Semester</TabsTrigger>
              )}
            </TabsList>
            <TabsContent value="First" className="mt-4">
              <ResultsTable results={group.semesters.First || []} />
            </TabsContent>
            <TabsContent value="Second" className="mt-4">
              <ResultsTable results={group.semesters.Second || []} />
            </TabsContent>
          </Tabs>
        </AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
);

export default ResultsAccordion;
