import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProfileCard from "./ProfileCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const EditLecturerSidebar = () => {


  return (
    <aside className="space-y-6">
      {/* Profile Card */}
      <ProfileCard />

      {/* Portfolio Section */}
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full">
            <Plus className="mr-2 h-4 w-4" />
            Add New Link
          </Button>
        </CardContent>
      </Card>

      {/* Skills Section */}
      {/* <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <SkillBadge key={index} skill={skill} />
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Input
              placeholder="Add a new skill"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleAddSkill();
                }
              }}
            />
            <Button onClick={handleAddSkill}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card> */}
    </aside>
  );
};

export default EditLecturerSidebar;
