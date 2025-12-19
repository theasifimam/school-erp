"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import { useAuthStore } from "@/lib/state/stores/authStore";
import { showRoleName } from "@/lib/data/controlData";
import { SignOutButton } from "../common/SignOutButton";
import { useSession } from "next-auth/react";

export default function AvatarDropdown() {
  // const { logout, user } = useAuthStore();
  const { data: session, status } = useSession();

  const user = session?.user;
  return (
    <div>
      {/* Avatar Dropdown Menu */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-2 focus:outline-none group pl-2">
            <div className="hidden md:block text-right">
              <p className="text-lg font-medium dark:text-white">
                {user?.fullName ? user.fullName : user?.username}
              </p>
              <p className="text-xs text-gray-500">
                {showRoleName[user?.role]}
              </p>
            </div>
            <Avatar className="w-9 h-9 cursor-pointer border-2 border-transparent group-hover:border-indigo-300 transition-all">
              <AvatarImage
                src={user?.profilePicture || "/admin-avatar.jpg"}
                alt="Admin"
              />
              <AvatarFallback className="text-gray-600 font-medium">
                {user?.username?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors hidden md:block" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            className="bg-white dark:bg-background z-88 shadow-lg rounded-3xl w-64 p-2 border border-gray-200 dark:border-gray-900 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
            align="end"
            sideOffset={8}
          >
            {/* Profile Section */}
            <DropdownMenu.Item className="p-3 hover:bg-gray-50 rounded-full cursor-pointer flex items-center gap-3 focus:outline-none dark:focus:text-gray-900">
              <Avatar className="w-10 h-10">
                <AvatarImage
                  src={user?.profilePicture || "/admin-avatar.jpg"}
                  alt="Admin"
                />
                <AvatarFallback className="font-medium">
                  {user?.fullName
                    ? user.fullName.charAt(0).toUpperCase()
                    : user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium ">
                  {user?.fullName ? user.fullName : user?.username}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </DropdownMenu.Item>

            <DropdownMenu.Separator className="h-px bg-gray-100 dark:bg-gray-900 my-1" />

            {/* Essential Menu Items */}
            <DropdownMenu.Group>
              <DropdownMenu.Item asChild>
                <a
                  href="/dashboard"
                  className="p-3 hover:bg-gray-50 rounded-full cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                >
                  <LayoutDashboard className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">Dashboard</span>
                </a>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <a
                  href="/profile"
                  className="p-3 hover:bg-gray-50 rounded-full cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                >
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">My Profile</span>
                </a>
              </DropdownMenu.Item>

              <DropdownMenu.Item asChild>
                <a
                  href="/settings"
                  className="p-3 hover:bg-gray-50 rounded-full cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-500">Settings</span>
                </a>
              </DropdownMenu.Item>
            </DropdownMenu.Group>

            <DropdownMenu.Separator className="h-px bg-gray-100 dark:bg-gray-900 my-1" />

            <DropdownMenu.Item asChild>
              <SignOutButton
                // onClick={logout}
                className="p-3 hover:bg-red-50 rounded-full w-full cursor-pointer flex itemms-start text-red-500 gap-3 focus:outline-none text-sm"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </SignOutButton>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
