import { LogOut, Settings, User } from "lucide-react";

import { useGetLoggedInUserQuery } from "@/redux/query/auth";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/dispatch-hooks";
import { exitUser } from "@/redux/slices/auth";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import UserImage from "../../assets/user.jpeg";
import { useNavigate } from "react-router-dom";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data } = useGetLoggedInUserQuery();
  const { user } = useAppSelector((state) => state.auth);

  const navigateProfile = () => {
    console.log(user?.role);
    if (user?.role === "lecturer") {
      navigate("/profile");
    }

    if (user?.role === "student") {
      navigate("/myprofile");
    }
  };

  return (
    <div className="">
      <DropdownMenuItem className="flex gap-4 items-center">
        <Avatar>
          <AvatarImage src={UserImage} />
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium">{data?.user?.name}</span>
          <span className="text-sm">{data?.user?.identifier}</span>
        </div>
      </DropdownMenuItem>
      <DropdownMenuSeparator className=" bg-gray-500" />
      <DropdownMenuGroup>
        <DropdownMenuItem
          onClick={() => navigateProfile()}
          className="cursor-pointer hover:bg-gray-200 font-medium"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile Details</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem
        className="cursor-pointer hover:bg-gray-200 font-medium"
        onClick={() => {
          dispatch(exitUser());
        }}
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Log out</span>
      </DropdownMenuItem>
    </div>
  );
};
export default ProfileDropdown;
