// src/components/messages/MessageBubble.tsx
import { forwardRef } from "react";
import { ChatMessage } from "@/types/chat";

// Helper function to format timestamp
const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const MessageBubble = forwardRef(({ message, position }, ref) => {
  // Define border radius based on position and sender
  const getBorderRadius = () => {
    const isUser = message.sender === "user";

    // Instagram-like styling with precise corner rounding
    if (position === "single") {
      // Single messages have 18px rounding except on bottom-right (user) or bottom-left (other)
      return isUser
        ? "rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px]"
        : "rounded-t-[18px] rounded-br-[18px] rounded-bl-[4px]";
    } else if (position === "first") {
      // First message in group - round on top and one bottom corner
      return isUser
        ? "rounded-t-[18px] rounded-bl-[18px] rounded-br-[4px]"
        : "rounded-t-[18px] rounded-br-[18px] rounded-bl-[4px]";
    } else if (position === "middle") {
      // Middle messages - less rounded on connecting sides
      return isUser
        ? "rounded-l-[18px] rounded-tr-[18px] rounded-br-[4px]"
        : "rounded-r-[18px] rounded-tl-[18px] rounded-bl-[4px]";
    } else if (position === "last") {
      // Last message in group - round on bottom and one top corner
      return isUser
        ? "rounded-b-[18px] rounded-tl-[18px] rounded-tr-[4px]"
        : "rounded-b-[18px] rounded-tr-[18px] rounded-tl-[4px]";
    }

    return "rounded-[18px]"; // Fallback
  };

  // Define background color based on sender
  const getBgColor = () => {
    return message.sender === "user"
      ? "bg-black text-white"
      : "bg-gray-100 text-black";
  };

  // Define timestamp text color based on sender
  const getTimeColor = () => {
    return message.sender === "user" ? "text-gray-300" : "text-gray-500";
  };

  // Show timestamp only on the last message of a group
  const showTimestamp = position === "single" || position === "last";

  return (
    <div
      ref={ref}
      className={`${getBorderRadius()} ${getBgColor()} p-3 ${
        position === "last" || position === "single" ? "mb-1" : "mb-0.5"
      } max-w-xs`}
    >
      <p className="text-sm">{message.content}</p>
      {showTimestamp && (
        <div className={`text-xs mt-1 text-right ${getTimeColor()}`}>
          {formatTime(message.timestamp)}
        </div>
      )}
    </div>
  );
});

MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
