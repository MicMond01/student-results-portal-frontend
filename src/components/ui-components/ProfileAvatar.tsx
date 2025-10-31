import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getNameInitials } from "@/lib/functions";

const ProfileAvatar: React.FC<{
  src: string;
  name: string;
  className?: string;
}> = ({ src, name, className = "h-32 w-32 border-4 border-white" }) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt={name} />
      <AvatarFallback className="text-3xl">
        {getNameInitials(name)}
      </AvatarFallback>
    </Avatar>
  );
};

export default ProfileAvatar;
