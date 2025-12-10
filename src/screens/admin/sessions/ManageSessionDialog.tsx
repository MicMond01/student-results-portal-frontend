import { useEffect } from "react";
import type { ISession, SessionFormData } from "./type";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";

const ManageSessionDialog: React.FC<{
  open: boolean;
  onOpenChange: (o: boolean) => void;
  session: ISession | null;
  onSave: (data: SessionFormData) => void;
  isLoading?: boolean;
  setFormData: (data: SessionFormData) => void;
  formData: SessionFormData;
}> = ({
  open,
  onOpenChange,
  session,
  onSave,
  isLoading,
  setFormData,
  formData,
}) => {
  useEffect(() => {
    if (open) {
      setFormData(
        session
          ? {
              session: session.session,
              startDate: session.startDate.split("T")[0],
              endDate: session.endDate.split("T")[0],
              isCurrent: session.isCurrent,
              isActive: session.isActive,
            }
          : {
              session: "",
              startDate: "",
              endDate: "",
              isCurrent: false,
              isActive: true,
            }
      );
    }
  }, [open, session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogHeader>
        <DialogTitle>
          {session ? "Edit Session" : "Create New Session"}
        </DialogTitle>
      </DialogHeader>
      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Session Name</Label>
            <Input
              placeholder="e.g. 2025/2026"
              value={formData.session}
              onChange={(e) =>
                setFormData({ ...formData, session: e.target.value })
              }
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Start Date</Label>
              <Input
                type="date"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>
            <div>
              <Label>End Date</Label>
              <Input
                type="date"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex flex-col gap-3 pt-2">
            <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="isCurrent"
                checked={formData.isCurrent}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    isCurrent: Boolean(checked),
                  })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="isCurrent"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Set as Current Session
                </label>
                <p className="text-xs text-gray-500">
                  This will be the default session for all new records.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-gray-50 transition-colors">
              <Checkbox
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({
                    ...formData,
                    isActive: Boolean(checked),
                  })
                }
              />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="isActive"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  Active Status
                </label>
                <p className="text-xs text-gray-500">
                  Allow operations within this session.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin mr-2" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Session
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ManageSessionDialog;
