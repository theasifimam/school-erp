import { useState } from "react";
import { Search, Edit, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Chat } from "@/types/chat";

export default function ChatList({
  chats,
  selectedChatId,
  onSelectChat,
  searchQuery,
  onSearchChange,
  onBack,
}) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      <div className="p-4 flex items-center justify-between border-b border-gray-100">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-lg font-semibold">Messages</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Edit size={20} />
        </button>
      </div>

      <div className="p-3">
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <Input
            placeholder="Search"
            className="pl-9 py-2 bg-gray-100 rounded-full border-none"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        {chats.length === 0 ? (
          <div className="p-4 text-center text-gray-500">No messages found</div>
        ) : (
          chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 flex items-center gap-3 hover:bg-gray-50 cursor-pointer ${
                selectedChatId === chat.id ? "bg-gray-50" : ""
              }`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="relative">
                <Avatar className="h-12 w-12 border border-gray-200">
                  <AvatarFallback className="bg-black text-white">
                    {chat.name.charAt(0)}
                  </AvatarFallback>
                  {chat.avatar && <AvatarImage src={chat.avatar} />}
                </Avatar>
                {chat.isActive && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <span
                    className={`font-medium truncate ${
                      chat.unreadCount > 0 ? "font-semibold" : ""
                    }`}
                  >
                    {chat.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(chat.timestamp)}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span
                    className={`text-sm truncate ${
                      chat.unreadCount > 0
                        ? "text-black font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    {chat.lastMessage}
                  </span>
                  {chat.unreadCount > 0 && (
                    <span className="h-5 w-5 flex items-center justify-center rounded-full bg-black text-white text-xs">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </ScrollArea>
    </>
  );
}
