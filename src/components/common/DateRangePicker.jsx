import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

export function DateRangePicker({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className="w-[280px] justify-start text-left font-normal rounded-full px-3 py-2 text-sm"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate ? (
            endDate ? (
              <>
                {format(startDate, "MMM d, yyyy")} -{" "}
                {format(endDate, "MMM d, yyyy")}
              </>
            ) : (
              format(startDate, "MMM d, yyyy")
            )
          ) : (
            <span>Pick a date range</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-2 rounded-3xl">
        <Calendar
          mode="range"
          selected={{ from: startDate, to: endDate }}
          onSelect={(range) => {
            setStartDate(range?.from);
            setEndDate(range?.to);
          }}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}
