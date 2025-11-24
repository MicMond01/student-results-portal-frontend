import { cn } from "@/lib/utils";

const Badge: React.FC<
  React.HTMLAttributes<HTMLDivElement> & {
    variant?:
      | "default"
      | "secondary"
      | "outline"
      | "success"
      | "warning"
      | "danger";
  }
> = ({ className, variant = "default", ...props }) => {
  const variants = {
    default: "bg-indigo-100 text-indigo-800 border-indigo-200",
    secondary: "bg-gray-100 text-gray-800 border-gray-200",
    outline: "border-gray-300 text-gray-700",
    success: "bg-green-100 text-green-800 border-green-200",
    danger: "bg-red-100 text-red-800 border-red-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
  };
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
};

export default Badge;
