"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  LayoutDashboard,
  Package,
  Users,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Bell,
  Search,
  School,
  BookOpen,
  GraduationCap,
  Calendar,
  ClipboardList,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function TopNavbar() {
  return (
    <nav className="bg-white text-gray-800 p-4 flex justify-between items-center h-[72px] border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      {/* Left side - Logo/Brand */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <School className="text-indigo-600 w-6 h-6" />
          <h1 className="text-xl font-semibold hidden md:block">EduManage</h1>
        </div>

        {/* Search Bar - Mobile */}
        <div className="md:hidden relative w-full max-w-[180px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200 focus:border-indigo-300 rounded-full text-sm"
          />
        </div>
      </div>

      {/* Right side - Navigation */}
      <div className="flex items-center gap-4">
        {/* Search Bar - Desktop */}
        <div className="hidden md:block relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 bg-gray-50 border-gray-200 focus:border-indigo-300 rounded-full text-sm"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          <Badge className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs p-0">
            3
          </Badge>
        </button>

        {/* Avatar Dropdown Menu */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="flex items-center gap-2 focus:outline-none group">
              <Avatar className="w-9 h-9 cursor-pointer border-2 border-transparent group-hover:border-indigo-300 transition-all">
                <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                  PS
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-gray-700 transition-colors" />
            </button>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="bg-white shadow-lg rounded-3xl w-64 p-2 border border-gray-200 will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
              align="end"
              sideOffset={8}
            >
              {/* Profile Section */}
              <DropdownMenu.Item className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center gap-3 focus:outline-none">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="/admin-avatar.jpg" alt="Admin" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-600 font-medium">
                    PS
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Principal Smith</p>
                  <p className="text-xs text-gray-500">
                    principal@edumanage.edu
                  </p>
                </div>
              </DropdownMenu.Item>

              <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />

              {/* Essential Menu Items */}
              <DropdownMenu.Group>
                <DropdownMenu.Item asChild>
                  <a
                    href="/dashboard"
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-500" />
                    <span>Dashboard</span>
                  </a>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <a
                    href="/profile"
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                  >
                    <User className="w-4 h-4 text-indigo-500" />
                    <span>My Profile</span>
                  </a>
                </DropdownMenu.Item>

                <DropdownMenu.Item asChild>
                  <a
                    href="/settings"
                    className="p-3 hover:bg-gray-50 rounded-lg cursor-pointer flex items-center text-gray-700 gap-3 focus:outline-none text-sm"
                  >
                    <Settings className="w-4 h-4 text-indigo-500" />
                    <span>Settings</span>
                  </a>
                </DropdownMenu.Item>
              </DropdownMenu.Group>

              <DropdownMenu.Separator className="h-px bg-gray-100 my-1" />

              <DropdownMenu.Item asChild>
                <a
                  href="/logout"
                  className="p-3 hover:bg-red-50 rounded-lg cursor-pointer flex items-center text-red-500 gap-3 focus:outline-none text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </a>
              </DropdownMenu.Item>

              <DropdownMenu.Arrow className="fill-white" />
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </nav>
  );
}
