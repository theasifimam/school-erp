import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const CalendarToolbar = ({
  label,
  onNavigate,
  onView,
  view,
  setCalendarView,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 py-3">
      <div className="flex gap-2">
        <Button
          variant="ghost"
          className="rounded-full h-9 w-9 p-0"
          onClick={() => onNavigate("PREV")}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className="rounded-full"
          onClick={() => onNavigate("TODAY")}
        >
          Today
        </Button>
        <Button
          variant="ghost"
          className="rounded-full h-9 w-9 p-0"
          onClick={() => onNavigate("NEXT")}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      <h2 className="text-lg font-medium text-gray-800">{label}</h2>

      <div className="flex gap-2">
        <Button
          variant={view === "day" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            onView("day");
            setCalendarView("day");
          }}
          className="rounded-full"
        >
          Day
        </Button>
        <Button
          variant={view === "week" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            onView("week");
            setCalendarView("week");
          }}
          className="rounded-full"
        >
          Week
        </Button>
        <Button
          variant={view === "month" ? "default" : "outline"}
          size="sm"
          onClick={() => {
            onView("month");
            setCalendarView("month");
          }}
          className="rounded-full"
        >
          Month
        </Button>
      </div>
    </div>
  );
};
