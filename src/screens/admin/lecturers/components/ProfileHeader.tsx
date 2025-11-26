import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const ProfileHeader = ({ lecturer, onEdit, onDelete }) => {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">{lecturer.name}</h1>
          <p className="text-muted-foreground">{lecturer.department?.name}</p>
          <Badge variant="secondary" className="mt-2">
            {lecturer.role}
          </Badge>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => onEdit(lecturer)}>Edit</Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileHeader;
