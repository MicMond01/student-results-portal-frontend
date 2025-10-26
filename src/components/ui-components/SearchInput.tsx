import * as React from "react";
import { cn } from "@/lib/utils";
import { SearchIcon } from "lucide-react";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    const [focus, setFocus] = React.useState(false);
    return (
      <div
        className={cn(
          "flex items-center gap-2 h-10 w-full rounded-md border border-input bg-background text-sm",
          focus &&
            "ring-offset-background outline-none ring-2 ring-ring ring-offset-2"
        )}
      >
        <div className="pl-1">
          <SearchIcon size={18} />
        </div>
        <input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          type={type}
          ref={ref}
          {...props}
          className={cn(
            "file:border-0 focus:ring-0 focus:border-none focus:outline-none text-sm bg-transparent pr-2 file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 w-full h-full",
            className
          )}
        />
      </div>
    );
  }
);
SearchInput.displayName = "Input";

export { SearchInput };
