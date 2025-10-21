// src/components/tables/cells/AvatarCell.tsx
import React from "react";

const AvatarCell: React.FC<{ name: string; avatarUrl?: string }> = ({
  name,
  avatarUrl,
}) => {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-[#cdc1ff] text-[#2b2653] ring-2 ring-[#e5d9f2]">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm font-semibold">{initials}</span>
        )}
      </div>
      <span className="font-medium text-[#2b2653]">{name}</span>
    </div>
  );
};
export default AvatarCell;
