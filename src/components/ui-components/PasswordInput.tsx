import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Controller, type Control } from "react-hook-form";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface PasswordInputProps {
  id: string;
  label: string;
  control: Control<any>;
  error?: string;
  autoComplete?: string;
}

const PasswordInput = ({
  id,
  label,
  control,
  error,
  autoComplete,
}: PasswordInputProps) => {
  const [show, setShow] = useState(false);

  return (
    <Controller
      name={id}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <Label htmlFor={id}>{label}</Label>
          <div className="relative">
            <Input
              id={id}
              type={show ? "text" : "password"}
              {...field}
              className={cn(error && "border-destructive")}
              autoComplete={autoComplete}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-gray-500"
              onClick={() => setShow(!show)}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </Button>
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
      )}
    />
  );
};

export default PasswordInput;
