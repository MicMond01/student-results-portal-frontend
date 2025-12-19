import { cn } from "@/lib/utils";

const Toggle = ({
  checked,
  onCheckedChange,
  label,
}: {
  checked: boolean;
  onCheckedChange: () => void;
  label?: string;
}) => (
  <div className="flex items-center justify-between">
    {label && (
      <span className="text-sm font-medium text-gray-700">{label}</span>
    )}
    <button
      onClick={onCheckedChange}
      className={cn(
        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
        checked ? "bg-indigo-600" : "bg-gray-200"
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
          checked ? "translate-x-6" : "translate-x-1"
        )}
      />
    </button>
  </div>
);

export default Toggle;
