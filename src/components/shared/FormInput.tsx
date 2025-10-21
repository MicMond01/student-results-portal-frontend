// src/components/shared/FormInput.tsx
import * as React from "react";
import { Controller } from "react-hook-form";
import type { Control } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Props = {
  name: string;
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  control: Control<any>;
  error?: string;
};

export const FormInput: React.FC<Props> = ({
  name,
  label,
  placeholder,
  type = "text",
  control,
  error,
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="text-[#2b2653]">
        {label}
      </Label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const hasError = !!error || fieldState.invalid;
          return (
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              {...field}
              className={[
                "h-11 bg-white/70 placeholder:text-[#6a5fa7] text-[#2b2653]",
                "border",
                hasError
                  ? "border-red-400 focus-visible:ring-red-400"
                  : "border-white/40 focus-visible:ring-[#7371fc]",
                "focus-visible:ring-2 focus-visible:ring-offset-0",
              ].join(" ")}
            />
          );
        }}
      />
      {error ? <p className="text-sm text-red-500">{error}</p> : null}
    </div>
  );
};
