import { Calendar } from "react-big-calendar";
import { CalendarToolbar } from "./CalendarToolbar";

export const CalendarView = ({
  localizer,
  filteredEvents,
  calendarView,
  handleSelectSlot,
  handleSelectEvent,
}) => {
  return (
    <Calendar
      localizer={localizer}
      events={filteredEvents}
      startAccessor="start"
      endAccessor="end"
      style={{ height: 700 }}
      views={["month", "week", "day"]}
      view={calendarView}
      selectable
      onSelectSlot={handleSelectSlot}
      onSelectEvent={handleSelectEvent}
      components={{
        toolbar: CalendarToolbar,
      }}
    />
  );
};
