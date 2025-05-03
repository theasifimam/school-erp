// src/app/communications/messages/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Toaster } from "sonner";

import ChatList from "@/components/communication/ChatList";
import MessageView from "@/components/communication/MessageView";
import EmptyState from "@/components/communication/EmptyState";

export default function MessagesPage() {
  const router = useRouter();
  const [selectedChat, setSelectedChat] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample chats data
  const [chats, setChats] = useState([
    {
      id: "1",
      name: "Sarah Williams",
      avatar: "",
      lastMessage: "Can you share the classroom photos?",
      timestamp: "2025-04-22T14:30:00",
      unreadCount: 2,
      isActive: true,
      messages: [
        {
          id: "101",
          content: "Hi there! Just checking about tomorrow's class schedule",
          timestamp: "2025-04-22T14:25:00",
          sender: "other",
          isRead: true,
        },
        {
          id: "102",
          content: "Sure, it starts at 9:00 AM",
          timestamp: "2025-04-22T14:27:00",
          sender: "user",
          isRead: true,
        },
        {
          id: "103",
          content: "Great, thanks!",
          timestamp: "2025-04-22T14:28:00",
          sender: "other",
          isRead: true,
        },
        {
          id: "104",
          content: "Can you share the classroom photos?",
          timestamp: "2025-04-22T14:29:00",
          sender: "other",
          isRead: false,
        },
        {
          id: "105",
          content: "Also, do we need to bring any materials?",
          timestamp: "2025-04-22T14:30:00",
          sender: "other",
          isRead: false,
        },
      ],
    },
    {
      id: "2",
      name: "Principal Thompson",
      avatar: "",
      lastMessage: "Meeting rescheduled to 3 PM",
      timestamp: "2025-04-22T10:15:00",
      unreadCount: 0,
      isActive: false,
      messages: [
        {
          id: "201",
          content: "Good morning, just a reminder about today's staff meeting",
          timestamp: "2025-04-22T10:10:00",
          sender: "other",
          isRead: true,
        },
        {
          id: "202",
          content: "Thanks for the reminder!",
          timestamp: "2025-04-22T10:12:00",
          sender: "user",
          isRead: true,
        },
        {
          id: "203",
          content: "I'll be there",
          timestamp: "2025-04-22T10:13:00",
          sender: "user",
          isRead: true,
        },
        {
          id: "204",
          content: "Do we need to prepare anything?",
          timestamp: "2025-04-22T10:14:00",
          sender: "user",
          isRead: true,
        },
        {
          id: "205",
          content: "Meeting rescheduled to 3 PM",
          timestamp: "2025-04-22T10:15:00",
          sender: "other",
          isRead: true,
        },
      ],
    },
    {
      id: "3",
      name: "Mark Davis",
      avatar: "",
      lastMessage: "The assignment materials are ready",
      timestamp: "2025-04-21T16:45:00",
      unreadCount: 0,
      isActive: true,
      messages: [
        {
          id: "301",
          content: "How's the science project coming along?",
          timestamp: "2025-04-21T16:40:00",
          sender: "other",
          isRead: true,
        },
        {
          id: "302",
          content: "Almost done! Just finalizing materials",
          timestamp: "2025-04-21T16:43:00",
          sender: "user",
          isRead: true,
        },
        {
          id: "303",
          content: "The assignment materials are ready",
          timestamp: "2025-04-21T16:45:00",
          sender: "other",
          isRead: true,
        },
      ],
    },
    {
      id: "4",
      name: "Emily Parker",
      avatar: "",
      lastMessage: "Yes, please email it to me",
      timestamp: "2025-04-20T13:05:00",
      unreadCount: 0,
      isActive: false,
      messages: [
        {
          id: "401",
          content: "Do you need the permission slip for the field trip?",
          timestamp: "2025-04-20T13:00:00",
          sender: "user",
          isRead: true,
        },
        {
          id: "402",
          content: "Yes, please email it to me",
          timestamp: "2025-04-20T13:05:00",
          sender: "other",
          isRead: true,
        },
      ],
    },
  ]);

  // Filter chats based on search query
  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);

    // Mark messages as read
    const updatedChats = chats.map((c) => {
      if (c.id === chat.id) {
        const updatedMessages = c.messages.map((msg) => ({
          ...msg,
          isRead: true,
        }));
        return {
          ...c,
          unreadCount: 0,
          messages: updatedMessages,
        };
      }
      return c;
    });

    setChats(updatedChats);
  };

  const handleSendMessage = (content) => {
    if (!content.trim() || !selectedChat) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      content,
      timestamp: new Date().toISOString(),
      sender: "user",
      isRead: false,
    };

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat.id) {
        return {
          ...chat,
          lastMessage: content,
          timestamp: new Date().toISOString(),
          messages: [...chat.messages, newMsg],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setSelectedChat(updatedChats.find((c) => c.id === selectedChat.id) || null);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header for mobile view */}
      <div className="md:hidden p-4 border-b border-gray-100 flex items-center">
        <button
          onClick={() => router.push("/communications")}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <ChevronLeft size={20} />
        </button>
        <h1 className="text-lg font-semibold ml-2">Messages</h1>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar with chats list */}
        <div
          className={`${
            selectedChat ? "hidden md:flex" : "flex"
          } w-full md:w-1/3 border-r border-gray-100 flex-col`}
        >
          <ChatList
            chats={filteredChats}
            selectedChatId={selectedChat?.id}
            onSelectChat={handleSelectChat}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onBack={() => router.push("/communications")}
          />
        </div>

        {/* Right area with chat content */}
        <div
          className={`${
            !selectedChat ? "hidden md:flex" : "flex"
          } w-full md:w-2/3 flex-col bg-white`}
        >
          {selectedChat ? (
            <MessageView
              chat={selectedChat}
              onSendMessage={handleSendMessage}
              onBack={() => setSelectedChat(null)}
            />
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      <Toaster position="top-center" />
    </div>
  );
}
