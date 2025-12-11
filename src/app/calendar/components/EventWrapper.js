// components/calendar/EventWrapper.jsx
import { EVENT_TYPES } from "../../data";

export function EventWrapper({ event, children }) {
  const getEventStyles = () => {
    const baseStyles = {
      backgroundColor: event.color || EVENT_TYPES[event.type]?.color,
      borderRadius: "4px",
      padding: "2px 4px",
      fontSize: "12px",
      color: "white",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
    };

    // Add special styling for leave requests
    if (event.type === "LEAVE") {
      const statusColor = getLeaveStatusColor(event.status);
      baseStyles.borderLeft = `4px solid ${statusColor}`;
      baseStyles.position = "relative";
    }

    // Add recurring event indicator
    if (event.recurring) {
      baseStyles.borderTop = "2px solid rgba(255, 255, 255, 0.8)";
    }

    return baseStyles;
  };

  const getLeaveStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "#10B981";
      case "rejected":
        return "#F43F5E";
      case "pending":
      default:
        return "#F59E0B";
    }
  };

  const getStatusIndicator = () => {
    if (event.type === "LEAVE" && event.status) {
      const statusIcons = {
        approved: "✓",
        rejected: "✗",
        pending: "⏳",
      };
      return (
        <span
          className="absolute top-0 right-0 text-xs"
          style={{ fontSize: "10px" }}
        >
          {statusIcons[event.status]}
        </span>
      );
    }
    return null;
  };

  return (
    <div style={getEventStyles()} className="relative">
      {children}
      {getStatusIndicator()}
      {event.recurring && (
        <div
          className="absolute bottom-0 right-0 text-xs opacity-70"
          style={{ fontSize: "8px" }}
        >
          ↻
        </div>
      )}
    </div>
  );
}

// components/calendar/EventContent.jsx
export function EventContent({ event }) {
  const formatEventTime = (start, end) => {
    const startTime = format(start, "HH:mm");
    const endTime = format(end, "HH:mm");
    return `${startTime} - ${endTime}`;
  };

  const getEventIcon = (eventType) => {
    const icons = {
      CLASS: "📚",
      EXAM: "📝",
      MEETING: "👥",
      HOLIDAY: "🎉",
      LEAVE: "🏖️",
      MAINTENANCE: "🔧",
      EVENT: "📅",
    };
    return icons[eventType] || "📅";
  };

  return (
    <div className="flex items-start gap-1">
      <span className="text-xs">{getEventIcon(event.type)}</span>
      <div className="flex flex-col flex-1 min-w-0">
        <div className="font-medium truncate">{event.title}</div>
        {!event.allDay && (
          <div className="text-xs opacity-80">
            {formatEventTime(event.start, event.end)}
          </div>
        )}
        {event.location && (
          <div className="text-xs opacity-70 truncate">📍 {event.location}</div>
        )}
      </div>
    </div>
  );
}
