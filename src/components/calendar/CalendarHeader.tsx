"use client";

import { AlertCircle, Calendar as CalendarIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CalendarHeader = ({
  userRole,
  userClass,
  onAddEvent,
  onRequestLeave,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarIcon className="h-6 w-6 text-indigo-600" />
          School Calendar - {userRole.toUpperCase()} VIEW
        </h1>
        <p className="text-gray-500">
          {userRole === "admin" && "Full administrative calendar access"}
          {userRole === "teacher" && `Viewing schedule for ${userClass}`}
          {userRole === "student" && "Your class schedule and events"}
          {userRole === "parent" && "Your child's school calendar"}
        </p>
      </div>

      <div className="flex gap-2 w-full md:w-auto">
        {(userRole === "admin" || userRole === "teacher") && (
          <Button
            className="gap-2 bg-indigo-600 hover:bg-indigo-700"
            onClick={onAddEvent}
          >
            <Plus className="h-4 w-4" />
            <span>{userRole === "admin" ? "Add Event" : "Schedule Class"}</span>
          </Button>
        )}
        {(userRole === "student" || userRole === "parent") && (
          <Button
            className="gap-2 rounded-3xl bg-indigo-600 hover:bg-indigo-700"
            onClick={onRequestLeave}
          >
            <AlertCircle className="h-4 w-4" />
            <span>Request Leave</span>
          </Button>
        )}
      </div>
    </div>
  );
};
