"use client";

import { Message } from "../_types/conversations";
import { cn } from "@/lib/utils";
import { CheckCheck, Clock } from "lucide-react";
import { useMemo } from "react";

interface MessageBubbleProps {
  message: Message;
  isAdmin: boolean;
  showTime?: boolean;
  className?: string;
}

export default function MessageBubble({
  message,
  isAdmin,
  showTime = true,
  className,
}: MessageBubbleProps) {
  const getBorderRadius = () => {
    switch (message.groupPosition) {
      case "single":
        return isAdmin
          ? "rounded-se-none rounded-2xl"
          : "rounded-ss-none rounded-2xl";
      case "first":
        return isAdmin
          ? "rounded-se-none rounded-2xl rounded-ee-sm"
          : "rounded-ss-none rounded-2xl rounded-es-sm";
      case "middle":
        return isAdmin
          ? "rounded-e-sm rounded-s-2xl"
          : "rounded-s-sm rounded-e-2xl";
      case "last":
        return isAdmin
          ? "rounded-ee-none rounded-2xl rounded-se-sm"
          : "rounded-es-none rounded-2xl rounded-ss-sm";
      default:
        return isAdmin
          ? "rounded-2xl rounded-se-none"
          : "rounded-2xl rounded-ss-none";
    }
  };

  const statusIndicator = useMemo(() => {
    if (!isAdmin) return null;
    if (message.status === "delivered") {
      return <CheckCheck className="h-2.5 w-2.5 text-primary-foreground/60" />;
    }
    if (message.status === "read") {
      return <CheckCheck className="h-2.5 w-2.5 text-blue-400" />;
    }
    return <Clock className="h-2.5 w-2.5 text-primary-foreground/60" />;
  }, [isAdmin, message.status]);

  return (
    <div
      className={cn(
        "flex",
        isAdmin ? "justify-end" : "justify-start",
        className,
        // Ultra-tight spacing between grouped messages
        message.groupPosition === "middle" || message.groupPosition === "last"
          ? "-mt-[5px]"
          : "mt-1"
      )}
    >
      <div
        className={cn(
          "max-w-xs lg:max-w-md px-3 py-1 relative",
          isAdmin
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground",
          getBorderRadius(),
          {
            "animate-in fade-in slide-in-from-bottom-1": message.isNew,
          }
        )}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-snug">
          {message.text}
        </p>

        {(showTime || statusIndicator) && (
          <div className="flex items-center justify-end gap-0 mt-0">
            <p
              className={cn(
                "text-[0.65rem] leading-none", // Ultra-small timestamp
                isAdmin ? "text-primary-foreground/80" : "text-muted-foreground"
              )}
            >
              {message.time}
            </p>
            {statusIndicator}
          </div>
        )}
      </div>
    </div>
  );
}
