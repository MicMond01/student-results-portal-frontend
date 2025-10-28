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

export function ConfirmationDialog({
  title,
  description,
  action,
  triggerLabel = "Open",
  confirmLabel = "Confirm",
  isDisabled = false,
}: {
  title: string;
  description: string;
  action: () => void;
  triggerLabel?: string | React.ReactNode;
  confirmLabel?: string;
  isDisabled?: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {typeof triggerLabel === "string" ? (
          <Button className="defult">{triggerLabel}</Button>
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
            className="bg-primary-4 text-primary-3 cursor-pointer"
            onClick={action}
            disabled={isDisabled}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
