"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CalendarToolbar = ({ label, onNavigate, onView, view }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-2">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="rounded-3xl"
          size="sm"
          onClick={() => onNavigate("PREV")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-3xl"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-3xl"
          onClick={() => onNavigate("NEXT")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <h2 className="text-lg font-medium">{label}</h2>

      <div className="flex gap-2">
        <Button
          variant={view === "day" ? "default" : "outline"}
          size="sm"
          onClick={() => onView("day")}
          className="rounded-3xl px-5"
        >
          Day
        </Button>
        <Button
          variant={view === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => onView("week")}
          className="rounded-3xl px-5"
        >
          Week
        </Button>
        <Button
          variant={view === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => onView("month")}
          className="rounded-3xl px-5"
        >
          Month
        </Button>
        <Button
          variant={view === "agenda" ? "default" : "outline"}
          size="sm"
          onClick={() => onView("agenda")}
          className="rounded-3xl px-5"
        >
          Agenda
        </Button>
      </div>
    </div>
  );
};
