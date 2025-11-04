import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";

export function ConfirmationDialog({
  title,
  description,
  action,
  triggerLabel = "Open",
  confirmLabel = "Confirm",
  type = "save",
}: {
  title: string;
  description: string;
  action: () => void;
  triggerLabel?: string | React.ReactNode;
  confirmLabel?: string;
  type: "save" | "delete";
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {typeof triggerLabel === "string" ? (
          <Button
            className={`${
              type === "delete"
                ? "text-red-100 hover:bg-red-600 bg-red-500"
                : "default"
            } flex`}
          >
            {type === "delete" ? (
              <>
                <Trash className="mr-1.5 h-4 w-4" />
                {triggerLabel}
              </>
            ) : (
              triggerLabel
            )}
          </Button>
        ) : (
          triggerLabel
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className={`${
              type === "delete"
                ? "text-red-100 hover:bg-red-600 bg-red-500"
                : "bg-primary-4 text-primary-3 "
            } `}
            onClick={action}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
