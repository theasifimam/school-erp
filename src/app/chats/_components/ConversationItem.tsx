import { Conversation } from "../_types/conversations";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export default function ConversationItem({
  conversation,
  isActive,
  onClick,
}: ConversationItemProps) {
  return (
    <div
      className={`p-4 hover:bg-muted cursor-pointer transition-colors ${
        isActive ? "bg-muted" : ""
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={conversation.customer.avatar} />
          <AvatarFallback>
            {conversation.customer.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <h3 className="font-medium truncate">
              {conversation.customer.name}
            </h3>
            <span className="text-xs text-muted-foreground">
              {conversation.messages?.[0]?.time || "12:00 PM"}
            </span>
          </div>
          <p className="text-sm text-muted-foreground truncate">
            {conversation.lastMessage}
          </p>
        </div>
        {conversation.unread > 0 && (
          <span className="h-5 w-5 flex items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
            {conversation.unread}
          </span>
        )}
      </div>
    </div>
  );
}
