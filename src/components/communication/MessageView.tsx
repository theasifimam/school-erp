import { useEffect, useRef, useState } from "react";
import { Phone, Video, Info, Send, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Chat, ChatMessage } from "@/types/chat";
import MessageBubble from "@/components/communication/MessageBubble";

interface MessageViewProps {
  chat: Chat;
  onSendMessage: (content: string) => void;
  onBack: () => void;
}

export default function MessageView({
  chat,
  onSendMessage,
  onBack,
}: MessageViewProps) {
  const [newMessage, setNewMessage] = useState<string>("");
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  // Group messages by sender for consecutive message styling
  const groupedMessages = chat.messages.reduce<
    { sender: string; messages: ChatMessage[] }[]
  >((groups, message) => {
    if (
      groups.length === 0 ||
      groups[groups.length - 1].sender !== message.sender
    ) {
      groups.push({ sender: message.sender, messages: [message] });
    } else {
      groups[groups.length - 1].messages.push(message);
    }
    return groups;
  }, []);

  return (
    <>
      {/* Chat header */}
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100 md:hidden"
          >
            <ChevronLeft size={20} />
          </button>
          <Avatar className="h-9 w-9 border border-gray-200">
            <AvatarFallback className="bg-black text-white">
              {chat.name.charAt(0)}
            </AvatarFallback>
            {chat.avatar && <AvatarImage src={chat.avatar} />}
          </Avatar>
          <div>
            <div className="font-medium">{chat.name}</div>
            <div className="text-xs text-gray-500">
              {chat.isActive ? "Active now" : "Last active today"}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Phone size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Video size={18} />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Info size={18} />
          </button>
        </div>
      </div>

      {/* Messages area */}
      <ScrollArea className="flex-1 p-4">
        <div className="flex flex-col gap-4">
          {groupedMessages.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className={`flex ${
                group.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div className="flex flex-col gap-1 max-w-3/4">
                {group.messages.map((message, messageIndex) => (
                  <MessageBubble
                    key={message.id}
                    message={message}
                    position={
                      group.messages.length === 1
                        ? "single"
                        : messageIndex === 0
                        ? "first"
                        : messageIndex === group.messages.length - 1
                        ? "last"
                        : "middle"
                    }
                  />
                ))}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message input */}
      <div className="p-3 border-t border-gray-100">
        <div className="flex items-center gap-2 bg-gray-100 rounded-full p-1 pl-4">
          <Input
            placeholder="Message..."
            className="bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <Button
            size="icon"
            variant="ghost"
            className="h-9 w-9 rounded-full hover:bg-gray-200"
            onClick={handleSend}
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </>
  );
}
